export interface dbPayloadResponse {
    error?: string;
    payload?: any;
}

export interface DbUtilityProps {
    dbparams: string;
    response: (res: dbPayloadResponse) => void;
    db?: IDBDatabase;
    filter?: string;
    limit?: number;
    payload?: any;
    keyName?: string;
}
const openingDb = (props: DbUtilityProps, nextFn: () => void) => {
    const dbparams = props.dbparams.split(".");
    props.keyName = dbparams[2];

    let version = 1;
    let dbname = dbparams[0];
    let pos = dbname.indexOf(":");
    if (pos > 0) {
        version = parseInt(dbname.substring(pos + 1));
        dbname = dbname.substring(0, pos);
    }
    const DBOpenRequest = window.indexedDB.open(dbname, version);

    // these two event handlers act on the database being opened
    // successfully, or not
    DBOpenRequest.onerror = (event) => {
        props.response({
            error: "Error opening database",
        });
    };

    DBOpenRequest.onupgradeneeded = (event) => {
        const db = event.target.result;

        db.onerror = (event) => {
            props.response({
                error: "Error opening database in upgrade",
            });
        };

        // Create an objectStore for this database

        const objectStore = db.createObjectStore(dbparams[1], {
            keyPath: dbparams[2],
        });
    };
    DBOpenRequest.onsuccess = (event) => {
        props.db = DBOpenRequest.result;
        nextFn();
    };
}

const openingDbTransaction = (props: DbUtilityProps, write: boolean, nextFn: (objStore: IDBObjectStore) => void) => {
    openingDb(props, () => {
        const dbparams = props.dbparams.split(".");
        const objectStore = props.db!.transaction(dbparams[1], write? "readwrite" : "readonly")
            .objectStore(dbparams[1]);
        nextFn(objectStore);
    });
}

const collectDbRecordNames = (props: DbUtilityProps, lst: IDBValidKey[]): string[] => {
    const n = lst.length;
    const res: string[] = [];
    const limit = props.limit || n;
    const filter = props.filter;
    for (let i = 0; i < n; i++) {
        const s = lst[i].toString();
        if (s && (!filter || s.includes(filter))) {
            res.push(s);
            if (res.length >= limit) {
                break;
            }
        }
    }
    return res;
};


const findSingleValidKey = (props: DbUtilityProps, lst: IDBValidKey[]): IDBValidKey | undefined => {
    const n = lst.length;
    const filter = props.filter;
    for (let i = 0; i < n; i++) {
        const s = lst[i].toString();
        if (s === filter) {
            return lst[i];
        }
    }
    return undefined;
};

const closingDb = (props: DbUtilityProps) => {
    if (props.db) {
        props.db.close();
        delete props.db;
    }
};

export const openingDbObjectStoreAndKeys = (props: DbUtilityProps, write: boolean, nextFn: (objStore: IDBObjectStore, keys:string[])=>void) => {
    openingDbTransaction(props, write, (objStore: IDBObjectStore) => {
        const objectStoreRequest = objStore.getAllKeys();
        objectStoreRequest.onsuccess = (event) => {
            const res = collectDbRecordNames(props, objectStoreRequest.result);
            nextFn(objStore, res);
        };
    })
};

export const openingDbObjectStoreSingleKey = (props: DbUtilityProps, write: boolean, nextFn: (objStore: IDBObjectStore, keys?: IDBValidKey) => void) => {
    openingDbTransaction(props, write, (objStore: IDBObjectStore) => {
        const objectStoreRequest = objStore.getAllKeys();
        objectStoreRequest.onsuccess = (event) => {
            const res = findSingleValidKey(props, objectStoreRequest.result);
            nextFn(objStore, res);
        };
    })
};

export const getDbKeyList = (props: DbUtilityProps) => {
    openingDbObjectStoreAndKeys(props, false, (objStore: IDBObjectStore, keys: string[]) => {
        props.response({
            payload: keys,
        });
        closingDb(props);
    });
};

export const saveDbItem = (props: DbUtilityProps) => {
    openingDbObjectStoreSingleKey(props, true, (objStore: IDBObjectStore, key?: IDBValidKey) => {
        const elem = { [props.keyName!]: props.filter, data: props.payload };
        const objectStoreRequest = key ? objStore.put(elem, key) : objStore.add(elem);
        objectStoreRequest.onsuccess = (event) => {
            props.response({ payload: "ok" });
            closingDb(props);
        };
    });
};

export const loadDbItem = (props: DbUtilityProps) => {
    openingDbObjectStoreSingleKey(props, false, (objStore: IDBObjectStore, key?: IDBValidKey) => {
        if (!key) {
            props.response({ error: "No key " + props.filter });
            closingDb(props);
            return;
        }
        const objectStoreRequest = objStore.get(key);
        objectStoreRequest.onsuccess = (event) => {
            props.response({ payload: objectStoreRequest.result.data });
            closingDb(props);
        };
    });
};
