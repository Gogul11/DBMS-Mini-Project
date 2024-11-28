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

ALTER SEQUENCE users_user_id_seq RESTART WITH 1000;

create table category(
    category_id serial not null,
    name varchar(100),
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(category_id)
);

ALTER SEQUENCE category_category_id_seq RESTART WITH 100;

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

ALTER SEQUENCE parts_part_id_seq RESTART WITH 100;

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

ALTER SEQUENCE supplier_supplier_id_seq RESTART WITH 1000;

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

ALTER SEQUENCE orders_order_id_seq RESTART WITH 1000;

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

ALTER SEQUENCE review_review_id_seq RESTART WITH 1000;

create table admin(
    admin_id serial not null,
    admin_name varchar(100),
    email varchar(50) not null unique,
    phone_number varchar(20) not null unique,
    password varchar(70) not null unique,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key(admin_id)
);

ALTER SEQUENCE admin_admin_id_seq RESTART WITH 1000;

CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,    
    part_id INT REFERENCES parts(part_id) ON DELETE CASCADE, 
    image_data BYTEA                
);

ALTER SEQUENCE images_image_id_seq RESTART WITH 1000;


INSERT INTO category (name, description) VALUES
('Engine Parts', 'Components related to the engine system, including pistons, crankshafts, and oil filters'),
('Electrical Parts', 'Parts related to the electrical system such as batteries, alternators, and spark plugs'),
('Suspension and Steering', 'Parts that help with the vehicle suspension and steering control like shock absorbers and tie rods'),
('Brake System Parts', 'Components involved in braking like brake pads, discs, and calipers'),
('Transmission Parts', 'Parts related to the vehicle transmission system including gearboxes and clutches'),
('Body and Frame Components', 'Parts that make up the body and structure of the vehicle such as bumpers and doors'),
('Cooling and Heating', 'Components that regulate the engine temperature and air conditioning like radiators and compressors'),
('Fuel System Parts', 'Parts that supply fuel to the engine such as fuel pumps, injectors, and tanks'),
('Lighting and Accessories', 'Parts related to the vehicle lighting system like headlights, taillights, and fog lights'),
('Wheels and Tires', 'Parts related to the vehicle wheels including tires, rims, and wheel bearings');

insert into admin(admin_name, email, phone_number, password) values 
('admin', 'admin@gmail.com', '9876543210', '12345678'),
('admin2', 'admin2@gmail.com', '9876598765', 'password'),
('admin3', 'admin3@gmail.com', '8765487654', '87654321');



CREATE OR REPLACE FUNCTION check_existing_user()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE username = NEW.username) THEN
        RAISE EXCEPTION 'User already exists with this username';
    END IF;

    IF EXISTS (SELECT 1 FROM users WHERE email = NEW.email) THEN
        RAISE EXCEPTION 'User already exists with this email';
    END IF;

    IF EXISTS (SELECT 1 FROM users WHERE phone_number = NEW.phone_number) THEN
        RAISE EXCEPTION 'User already exists with this phone number';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_user_insert
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION check_existing_user();


CREATE OR REPLACE FUNCTION check_duplicate_supplier()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM supplier WHERE supplier_name = NEW.supplier_name) THEN
        RAISE EXCEPTION 'Supplier with this name already exists';
    END IF;

    IF EXISTS (SELECT 1 FROM supplier WHERE email = NEW.email) THEN
        RAISE EXCEPTION 'Supplier with this email already exists';
    END IF;


    IF EXISTS (SELECT 1 FROM supplier WHERE phone_number = NEW.phone_number) THEN
        RAISE EXCEPTION 'Supplier with this phone number already exists';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_insert_supplier
BEFORE INSERT ON supplier
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_supplier();



CREATE OR REPLACE PROCEDURE insert_into_supplied(
    supplier_id_param INT,
    part_id_param INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO supplied (supplier_id, part_id)
    VALUES (supplier_id_param, part_id_param)
    ON CONFLICT (supplier_id, part_id) DO NOTHING;

END;
$$;
