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
INSERT property (id, title, year, description, price, city, state, thumbnail) VALUES
(UUID_TO_BIN(UUID()), 'Magical Mountain Lake Tahoe Home', 1975, 'Magical house located next to Californias most beautiful natural lake', 3700000,'Lake Tahoe', 'CA', 'https://images.unsplash.com/photo-1594771386350-7ff4d17afbc2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(UUID_TO_BIN(UUID()), 'Modern Downtown Loft', 2015, 'Stylish loft with city views and walking distance to restaurants and shops.', 725000, 'Denver', 'CO', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Cozy Cabin in the Woods', 1988, 'Secluded and peaceful 2-bedroom cabin surrounded by nature.', 430000, 'Asheville', 'NC', 'https://images.unsplash.com/photo-1600585152930-6f92dc0b63c9?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Luxury Beachfront Villa', 2020, 'Stunning modern villa with private beach access and infinity pool.', 4500000, 'Malibu', 'CA', 'https://images.unsplash.com/photo-1600585153041-34c3ab83b1e9?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Historic Brownstone', 1925, 'Charming brownstone with original features in a classic neighborhood.', 950000, 'Boston', 'MA', 'https://images.unsplash.com/photo-1600585152940-28989f4bfaeb?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Desert Modern Retreat', 2017, 'Architect-designed home in the desert, combining minimalism with luxury.', 2100000, 'Palm Springs', 'CA', 'https://images.unsplash.com/photo-1600585153344-6d3bc28978f3?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Lakefront Family Home', 2003, 'Spacious 5-bedroom home with a large deck and private dock.', 1200000, 'Lake Oswego', 'OR', 'https://images.unsplash.com/photo-1600585153053-ecf42bbff3bb?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Minimalist Mountain Chalet', 2019, 'Sleek Scandinavian-inspired design with panoramic mountain views.', 1870000, 'Jackson', 'WY', 'https://images.unsplash.com/photo-1600585153060-f0a3b5e30f6d?w=2670&auto=format&fit=crop'),
(UUID_TO_BIN(UUID()), 'Urban Industrial Loft', 2012, 'Open-plan living space with exposed brick and modern fixtures.', 650000, 'Portland', 'OR', 'https://images.unsplash.com/photo-1600585153063-d9fd636f1c35?w=2670&auto=format&fit=crop');
