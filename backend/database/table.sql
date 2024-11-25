create table users(
    user_id serial not null,
    username varchar(100) not null,
    email varchar(50) not null unique,
    password varchar(70) not null,
    phone_number varchar(20) not null unique,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(user_id)
);

create table category(
    category_id serial not null,
    name varchar(100),
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(category_id)
);

create table parts(
    part_id serial not null,
    name varchar(100) not null,
    description text,
    price numeric,
    category_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(part_id),
    foreign key(category_id) references category(category_id)
);


create table supplier(
    supplier_id serial not null,
    supplier_name varchar(100),
    email varchar(50) not null unique,
    phone_number varchar(20) not null unique,
    password varchar(70) not null unique,
    address text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(supplier_id)
);

create table supplied(
    supplier_id int,
    part_id int,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(supplier_id, part_id),
    foreign key(supplier_id) references supplier(supplier_id),
    foreign key(part_id) references parts(part_id)
);

create table orders(
    order_id serial,
    user_id int,
    part_id int,
    order_date date,
    amount numeric,
    status varchar(20) check (status in ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(order_id),
    foreign key(user_id) references users(user_id),
    foreign key(part_id) references parts(part_id)
);
create table review(
    review_id serial not null,
    user_id int,
    part_id int,
    rating int check (rating >= 0 and rating <= 5),
    comment text null,
    created_at timestamp default current_timestamp,
    primary key(review_id),
    foreign key(user_id) references users(user_id),
    foreign key(part_id) references parts(part_id)
);

create table admin(
    admin_id serial not null,
    admin_name varchar(100),
    email varchar(50) not null unique,
    phone_number varchar(20) not null unique,
    password varchar(70) not null unique,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(admin_id)
)

-- INSERT INTO category (name, description) VALUES
-- ('Engine Parts', 'Components related to the engine system, including pistons, crankshafts, and oil filters'),
-- ('Electrical Parts', 'Parts related to the electrical system such as batteries, alternators, and spark plugs'),
-- ('Suspension and Steering', 'Parts that help with the vehicle suspension and steering control like shock absorbers and tie rods'),
-- ('Brake System Parts', 'Components involved in braking like brake pads, discs, and calipers'),
-- ('Transmission Parts', 'Parts related to the vehicle transmission system including gearboxes and clutches'),
-- ('Body and Frame Components', 'Parts that make up the body and structure of the vehicle such as bumpers and doors'),
-- ('Cooling and Heating', 'Components that regulate the engine temperature and air conditioning like radiators and compressors'),
-- ('Fuel System Parts', 'Parts that supply fuel to the engine such as fuel pumps, injectors, and tanks'),
-- ('Lighting and Accessories', 'Parts related to the vehicle lighting system like headlights, taillights, and fog lights'),
-- ('Wheels and Tires', 'Parts related to the vehicle wheels including tires, rims, and wheel bearings');
