-- Create and use DB
CREATE DATABASE RealEstate_DB;
USE RealEstate_DB;

CREATE TABLE property (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    description VARCHAR(512) NOT NULL,
    price INT NOT NULL,
	city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    thumbnail TEXT NOT NULL -- THumbnail picture

);

CREATE TABLE firm (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    established INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL

);

CREATE TABLE property_firms (
	property_id BINARY(16) REFERENCES property(id),
    firm_id INT REFERENCES firm(id),
    PRIMARY KEY (property_id, firm_id)
);



-- VALUES
INSERT INTO firm (name, city, state, established, email, website) VALUES
('Doe & Sons', 'San Francisco', 'CA', 1996, 'hello@doesons.com', 'doensons.com'),
('Harborview Realty', 'Seattle', 'WA', 2003, 'contact@harborview.com', 'harborview.com'),
('Lakeside Living', 'Minneapolis', 'MN', 2010, 'info@lakesideliving.com', 'lakesideliving.com'),
('Golden Key Estates', 'Austin', 'TX', 1998, 'hello@goldenkey.com', 'goldenkeyestates.com'),
('Skyline Properties', 'Chicago', 'IL', 2005, 'support@skylineprops.com', 'skylineprops.com'),
('Desert Bloom Realty', 'Phoenix', 'AZ', 2012, 'contact@desertbloom.com', 'desertbloomrealty.com'),
('Summit Ridge Realty', 'Denver', 'CO', 2007, 'info@summitridge.com', 'summitridgerealty.com'),
('Coastal Nest Realty', 'Miami', 'FL', 2016, 'team@coastalnest.com', 'coastalnestrealty.com'),
('Maplewood Homes', 'Portland', 'OR', 2001, 'sales@maplewoodhomes.com', 'maplewoodhomes.com');

-- SELECT * FROM firm
