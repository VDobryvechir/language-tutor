create table languages (
  	id           SERIAL PRIMARY KEY,
        code         varchar(5),
        name         varchar(100),
        translation  nvarchar(max)
);
create table sources (
	id           SERIAL PRIMARY KEY,
        name         varchar(500),
        languageId   int,
        comment      varchar(2000), 
        translation  nvarchar(max)
);
create table book (
        id          SERIAL PRIMARY KEY,
        sourceId    int,
        name        varchar(500),
        translation nvarchar(max)
);
create table chapter (
        id          SERIAL PRIMARY KEY,
        bookId      int,
        name        varchar(500),
        translation nvarchar(max),
        audio       nvarchar(max)
);
create table verse (
        id          SERIAL PRIMARY KEY,
        chapterId   int,
        name        varchar(500),
        translation nvarchar(max),
        audio       nvarchar(max),
        pictures    nvarchar(max),
        words       nvarchar(max) 
);



