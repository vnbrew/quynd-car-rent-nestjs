-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema quynd_car_rent_nestjs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema quynd_car_rent_nestjs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quynd_car_rent_nestjs` ;
USE `quynd_car_rent_nestjs` ;

-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`rental_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`rental_statuses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_steerings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_steerings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_statuses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NOT NULL COMMENT 'Available\nRepair\n',
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`offices` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `lat` DECIMAL(10,2) NOT NULL,
  `lon` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_capacities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_capacities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`cars` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `office_id` INT(11) NOT NULL,
  `car_type_id` INT(11) NOT NULL COMMENT 'Sport\nSUV\nMPV\nSedan\nCoupe\nHatchback',
  `car_capacity_id` INT(11) NOT NULL COMMENT '2 person\n4 person\n6 person\n8 or More',
  `car_steering_id` INT(11) NOT NULL COMMENT 'Manual\nElectric',
  `car_status_id` INT(11) NOT NULL COMMENT 'Available\nRepair',
  `name` VARCHAR(255) NOT NULL,
  `gasoline` INT(3) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `KEY` (`name` ASC) VISIBLE,
  INDEX `pk_car_steerings_cars` (`car_steering_id` ASC) VISIBLE,
  INDEX `pk_car_statuses_cars` (`car_status_id` ASC) VISIBLE,
  INDEX `pk_offices_cars` (`office_id` ASC) VISIBLE,
  INDEX `pk_car_types_cars` (`car_type_id` ASC) VISIBLE,
  INDEX `pk_car_capacities_cars` (`car_capacity_id` ASC) VISIBLE,
  CONSTRAINT `pk_car_steerings_cars`
    FOREIGN KEY (`car_steering_id`)
    REFERENCES `quynd_car_rent_nestjs`.`car_steerings` (`id`),
  CONSTRAINT `pk_car_statuses_cars`
    FOREIGN KEY (`car_status_id`)
    REFERENCES `quynd_car_rent_nestjs`.`car_statuses` (`id`),
  CONSTRAINT `pk_offices_cars`
    FOREIGN KEY (`office_id`)
    REFERENCES `quynd_car_rent_nestjs`.`offices` (`id`),
  CONSTRAINT `pk_car_types_cars`
    FOREIGN KEY (`car_type_id`)
    REFERENCES `quynd_car_rent_nestjs`.`car_types` (`id`),
  CONSTRAINT `pk_car_capacities_cars`
    FOREIGN KEY (`car_capacity_id`)
    REFERENCES `quynd_car_rent_nestjs`.`car_capacities` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`user_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`user_statuses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`user_roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(20) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_role_id` INT(11) NOT NULL,
  `user_status_id` INT(11) NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(30) NOT NULL,
  `image_url` VARCHAR(100) NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `KEY` (`username` ASC, `name` ASC, `email` ASC, `phone_number` ASC) VISIBLE,
  INDEX `pk_user_statuses_users` (`user_status_id` ASC) VISIBLE,
  INDEX `pk_user_roles_users` (`user_role_id` ASC) VISIBLE,
  CONSTRAINT `pk_user_statuses_users`
    FOREIGN KEY (`user_status_id`)
    REFERENCES `quynd_car_rent_nestjs`.`user_statuses` (`id`),
  CONSTRAINT `pk_user_roles_users`
    FOREIGN KEY (`user_role_id`)
    REFERENCES `quynd_car_rent_nestjs`.`user_roles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`rentals` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_id` INT(11) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  `rental_status_id` INT(11) NOT NULL,
  `admin_id` INT(11) NULL DEFAULT NULL,
  `pick_date_time` DATETIME NOT NULL,
  `drop_date_time` DATETIME NOT NULL,
  `rental_date_time` DATETIME NULL DEFAULT NULL,
  `detail` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_rental_statuses_rentals` (`rental_status_id` ASC) VISIBLE,
  INDEX `pk_cars_rentals` (`car_id` ASC) VISIBLE,
  INDEX `pk_user_customer_rentals` (`customer_id` ASC) VISIBLE,
  INDEX `pk_user_admin_rentals` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `pk_rental_statuses_rentals`
    FOREIGN KEY (`rental_status_id`)
    REFERENCES `quynd_car_rent_nestjs`.`rental_statuses` (`id`),
  CONSTRAINT `pk_cars_rentals`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`),
  CONSTRAINT `pk_user_customer_rentals`
    FOREIGN KEY (`customer_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`),
  CONSTRAINT `pk_user_admin_rentals`
    FOREIGN KEY (`admin_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`coupon_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`coupon_types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`coupons` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `coupon_type_id` INT(11) NOT NULL,
  `code` VARCHAR(30) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_coupon_types_coupons` (`coupon_type_id` ASC) VISIBLE,
  CONSTRAINT `pk_coupon_types_coupons`
    FOREIGN KEY (`coupon_type_id`)
    REFERENCES `quynd_car_rent_nestjs`.`coupon_types` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`add_charges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`add_charges` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `reason` VARCHAR(255) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_id` INT(11) NOT NULL,
  `image_url` VARCHAR(120) NOT NULL,
  `ordering` INT(2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `KEY` (`ordering` ASC) VISIBLE,
  INDEX `pk_car_car_images` (`car_id` ASC) VISIBLE,
  CONSTRAINT `pk_car_car_images`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`user_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`user_tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `expiration_time` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_users_user_tokens` (`user_id` ASC) VISIBLE,
  CONSTRAINT `pk_users_user_tokens`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`user_login_sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`user_login_sections` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `login_time` DATETIME NOT NULL,
  `logout_time` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `pk_users_user_login_sections`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`)
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`favorites` (
  `car_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `status` INT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`car_id`, `user_id`),
  INDEX `pk_users_favorites` (`user_id` ASC) VISIBLE,
  CONSTRAINT `pk_cars_favorites`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`),
  CONSTRAINT `pk_users_favorites`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`payments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `rental_id` INT(11) NOT NULL,
  `admin_id` INT(11) NOT NULL,
  `tax` FLOAT NOT NULL,
  `pay_date_time` DATETIME NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_rentals_payments` (`rental_id` ASC) VISIBLE,
  INDEX `pk_users_payments` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `pk_rentals_payments`
    FOREIGN KEY (`rental_id`)
    REFERENCES `quynd_car_rent_nestjs`.`rentals` (`id`),
  CONSTRAINT `pk_users_payments`
    FOREIGN KEY (`admin_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`payment_add_charges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`payment_add_charges` (
  `add_charges_id` INT(11) NOT NULL,
  `payment_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`add_charges_id`, `payment_id`),
  INDEX `pk_payment_ payment_add_charges` (`payment_id` ASC) VISIBLE,
  CONSTRAINT `pk_payment_ payment_add_charges`
    FOREIGN KEY (`payment_id`)
    REFERENCES `quynd_car_rent_nestjs`.`payments` (`id`),
  CONSTRAINT `pk_add_charges_ payment_add_charges`
    FOREIGN KEY (`add_charges_id`)
    REFERENCES `quynd_car_rent_nestjs`.`add_charges` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_prices` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_id` INT(11) NOT NULL,
  `rental_price` DECIMAL(10,2) NOT NULL,
  `original_price` DECIMAL(10,2) NOT NULL,
  `from_date_time` DATETIME NOT NULL,
  `to_date_time` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_car_price` (`car_id` ASC) VISIBLE,
  CONSTRAINT `pk_car_price`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`reviews` (
  `car_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `rate` INT(1) NOT NULL,
  `comment` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`car_id`, `user_id`),
  INDEX `pk_users_reviews` (`user_id` ASC) VISIBLE,
  CONSTRAINT `pk_cars_reviews`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`),
  CONSTRAINT `pk_users_reviews`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`users_cars_coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`users_cars_coupons` (
  `car_id` INT(11) NOT NULL,
  `coupon_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`car_id`, `coupon_id`, `user_id`),
  INDEX `pk_users_users_cars_coupons` (`user_id` ASC) VISIBLE,
  INDEX `pk_coupons_users_cars_coupons` (`coupon_id` ASC) VISIBLE,
  CONSTRAINT `pk_cars_users_cars_coupons`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`),
  CONSTRAINT `pk_users_users_cars_coupons`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`),
  CONSTRAINT `pk_coupons_users_cars_coupons`
    FOREIGN KEY (`coupon_id`)
    REFERENCES `quynd_car_rent_nestjs`.`coupons` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`notifications` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `pk_users_notifications` (`user_id` ASC) VISIBLE,
  CONSTRAINT `pk_users_notifications`
    FOREIGN KEY (`user_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`reservation_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`reservation_types` (
  `id` INT(11) NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`car_reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`car_reservations` (
  `id` INT(11) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  `car_id` INT(11) NOT NULL,
  `reservation_type_id` INT(11) NOT NULL,
  `admin_id` INT(11) NULL,
  `reservation_start_date_time` DATETIME NOT NULL,
  `reservation_end_date_time` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `aaaaaaaa_idx` (`customer_id` ASC) VISIBLE,
  INDEX `admin_idx` (`admin_id` ASC) VISIBLE,
  INDEX `car_idx` (`car_id` ASC) VISIBLE,
  INDEX `reservation_types_idx` (`reservation_type_id` ASC) VISIBLE,
  CONSTRAINT `pk_user_car_reservations_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT `pk_user_car_reservations_admin`
    FOREIGN KEY (`admin_id`)
    REFERENCES `quynd_car_rent_nestjs`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pk_cars_reservations_customer`
    FOREIGN KEY (`car_id`)
    REFERENCES `quynd_car_rent_nestjs`.`cars` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pk_reservation_types_car_reservations`
    FOREIGN KEY (`reservation_type_id`)
    REFERENCES `quynd_car_rent_nestjs`.`reservation_types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quynd_car_rent_nestjs`.`coupons_cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quynd_car_rent_nestjs`.`coupons_cars` (
  `coupon_id` INT(11) NOT NULL,
  `car_id` INT(11) NOT NULL,
  `discount_value` DECIMAL(10,2) NOT NULL,
  `usage_count` INT(3) NOT NULL,
  `expiration_time` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`coupon_id`, `car_id`),
  CONSTRAINT `pk_coupon_coupons_cars`
    FOREIGN KEY (`coupon_id`)
    REFERENCES `quynd_car_rent_nestjs`.`coupons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
