create table "User"
(
    id        text                            not null
        primary key,
    email     text                            not null,
    firstname text                            not null,
    lastname  text                            not null,
    role      "Role" default 'CLIENT'::"Role" not null,
    password  text                            not null
);

alter table "User"
    owner to agorapulse;

create unique index "User_email_key"
    on "User" (email);

create table "Tags"
(
    id   text not null
        primary key,
    name text not null
);

alter table "Tags"
    owner to agorapulse;

create table "Store"
(
    id        text         not null
        primary key,
    iot_id    text         not null,
    linked_at timestamp(3) not null,
    "userId"  text         not null
        references "User"
            on update cascade on delete restrict
);

alter table "Store"
    owner to agorapulse;

create unique index "Store_iot_id_key"
    on "Store" (iot_id);

create unique index "Store_userId_key"
    on "Store" ("userId");

create table "Picture"
(
    id        text not null
        primary key,
    url       text not null,
    "storeId" text not null
        references "Store"
            on update cascade on delete restrict
);

alter table "Picture"
    owner to agorapulse;

create table "Ads"
(
    id              text    not null
        primary key,
    url             text    not null,
    picture_url     text    not null,
    ad_type         text    not null,
    title           text    not null,
    description     text    not null,
    fidelity_points integer not null,
    "storeId"       text    not null
        references "Store"
            on update cascade on delete restrict
);

alter table "Ads"
    owner to agorapulse;

create table "Achievement"
(
    id          text    not null
        primary key,
    treshold    integer not null,
    title       text    not null,
    description text    not null,
    "storeId"   text    not null
        references "Store"
            on update cascade on delete restrict
);

alter table "Achievement"
    owner to agorapulse;

create table "Tags_Users"
(
    "userId" text not null
        references "User"
            on update cascade on delete restrict,
    "tagId"  text not null
        references "Tags"
            on update cascade on delete restrict,
    primary key ("tagId", "userId")
);

alter table "Tags_Users"
    owner to agorapulse;

create table "Tags_Stores"
(
    "storeId" text not null
        references "Store"
            on update cascade on delete restrict,
    "tagId"   text not null
        references "Tags"
            on update cascade on delete restrict,
    primary key ("tagId", "storeId")
);

alter table "Tags_Stores"
    owner to agorapulse;

create table "Users_Stores"
(
    "userId"  text not null
        references "User"
            on update cascade on delete restrict,
    "storeId" text not null
        references "Store"
            on update cascade on delete restrict,
    primary key ("userId", "storeId")
);

alter table "Users_Stores"
    owner to agorapulse;

create table users_ads
(
    "userId" text not null
        references "User"
            on update cascade on delete restrict,
    "adId"   text not null
        references "Ads"
            on update cascade on delete restrict,
    primary key ("userId", "adId")
);

alter table users_ads
    owner to agorapulse;

