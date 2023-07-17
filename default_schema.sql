-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema default_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `default_schema`;
USE `default_schema`;

-- -----------------------------------------------------
-- Table `default_schema`.`rental_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`rental_statuses`
(
    `id`          INT(11)     NOT NULL AUTO_INCREMENT,
    `status`      VARCHAR(30) NOT NULL,
    `description` TEXT        NULL     DEFAULT '',
    `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_steerings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_steerings`
(
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(255) NOT NULL,
    `description` TEXT         NULL,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_statuses`
(
    `id`          INT(11)     NOT NULL AUTO_INCREMENT,
    `status`      VARCHAR(30) NOT NULL COMMENT 'Available\nRepair\n',
    `description` TEXT        NULL,
    `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`offices`
(
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) NOT NULL,
    `city`       VARCHAR(255) NOT NULL,
    `address`    VARCHAR(255) NOT NULL,
    `coordinate` POINT        NOT NULL,
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_types`
(
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(255) NOT NULL,
    `description` TEXT         NULL,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_capacities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_capacities`
(
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(255) NOT NULL,
    `description` TEXT         NULL,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`cars`
(
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `office_id`       INT(11)      NOT NULL,
    `car_type_id`     INT(11)      NOT NULL COMMENT 'Sport\nSUV\nMPV\nSedan\nCoupe\nHatchback',
    `car_capacity_id` INT(11)      NOT NULL COMMENT '2 person\n4 person\n6 person\n8 or More',
    `car_steering_id` INT(11)      NOT NULL COMMENT 'Manual\nElectric',
    `car_status_id`   INT(11)      NOT NULL COMMENT 'Available\nRepair',
    `name`            VARCHAR(255) NOT NULL,
    `gasoline`        INT(3)       NOT NULL,
    `description`     TEXT         NULL,
    `created_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `name_index` (`name` ASC) VISIBLE,
    INDEX `gasoline_index` (`gasoline` ASC) VISIBLE,
    INDEX `pk_car_steerings_cars` (`car_steering_id` ASC) VISIBLE,
    INDEX `pk_car_statuses_cars` (`car_status_id` ASC) VISIBLE,
    INDEX `pk_offices_cars` (`office_id` ASC) VISIBLE,
    INDEX `pk_car_types_cars` (`car_type_id` ASC) VISIBLE,
    INDEX `pk_car_capacities_cars` (`car_capacity_id` ASC) VISIBLE,
    CONSTRAINT `pk_car_steerings_cars`
        FOREIGN KEY (`car_steering_id`)
            REFERENCES `default_schema`.`car_steerings` (`id`),
    CONSTRAINT `pk_car_statuses_cars`
        FOREIGN KEY (`car_status_id`)
            REFERENCES `default_schema`.`car_statuses` (`id`),
    CONSTRAINT `pk_offices_cars`
        FOREIGN KEY (`office_id`)
            REFERENCES `default_schema`.`offices` (`id`),
    CONSTRAINT `pk_car_types_cars`
        FOREIGN KEY (`car_type_id`)
            REFERENCES `default_schema`.`car_types` (`id`),
    CONSTRAINT `pk_car_capacities_cars`
        FOREIGN KEY (`car_capacity_id`)
            REFERENCES `default_schema`.`car_capacities` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `default_schema`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`users`
(
    `id`           INT(11)                NOT NULL AUTO_INCREMENT,
    `role`         ENUM ('admin', 'user') NOT NULL DEFAULT 'user',
    `email`        VARCHAR(100)           NOT NULL UNIQUE,
    `password`     VARCHAR(255)           NOT NULL,
    `name`         VARCHAR(100)           NOT NULL,
    `city`         VARCHAR(100)           NULL     DEFAULT '',
    `address`      VARCHAR(100)           NULL     DEFAULT '',
    `phone_number` VARCHAR(30)            NULL     DEFAULT '',
    `image_url`    VARCHAR(100)           NULL     DEFAULT '',
    `created_at`   DATETIME               NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   DATETIME               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `name_email_index` (`name` ASC, `email` ASC) VISIBLE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`user_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`user_tokens`
(
    `id`              INT(11)      NOT NULL AUTO_INCREMENT,
    `user_id`         INT(11)      NOT NULL UNIQUE,
    `token`           VARCHAR(255) NOT NULL,
    `expiration_time` DATETIME     NOT NULL,
    `created_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `token_index` (`token` ASC) VISIBLE,
    INDEX `pk_users_user_tokens` (`user_id` ASC) VISIBLE,
    CONSTRAINT `pk_users_user_tokens`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON UPDATE RESTRICT
            ON DELETE CASCADE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`rentals`
(
    `id`               INT(11)  NOT NULL AUTO_INCREMENT,
    `car_id`           INT(11)  NOT NULL,
    `user_id`          INT(11)  NOT NULL,
    `rental_status_id` INT(11)  NOT NULL,
    `pick_date_time`   DATETIME NOT NULL,
    `drop_date_time`   DATETIME NOT NULL,
    `detail`           TEXT     NULL     DEFAULT '',
    `created_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `pk_rental_statuses_rentals`
        FOREIGN KEY (`rental_status_id`)
            REFERENCES `default_schema`.`rental_statuses` (`id`)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
    CONSTRAINT `pk_cars_rentals`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON UPDATE RESTRICT
            ON DELETE CASCADE,
    CONSTRAINT `pk_user_customer_rentals`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON UPDATE RESTRICT
            ON DELETE CASCADE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`coupon_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`coupon_types`
(
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `type`        VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`coupons`
(
    `id`             INT(11)     NOT NULL AUTO_INCREMENT,
    `coupon_type_id` INT(11)     NOT NULL,
    `code`           VARCHAR(30) NOT NULL,
    `created_at`     DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `pk_coupon_types_coupons` (`coupon_type_id` ASC) VISIBLE,
    CONSTRAINT `pk_coupon_types_coupons`
        FOREIGN KEY (`coupon_type_id`)
            REFERENCES `default_schema`.`coupon_types` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`add_charges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`add_charges`
(
    `id`         INT(11)        NOT NULL AUTO_INCREMENT,
    `reason`     VARCHAR(255)   NOT NULL,
    `amount`     DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_images`
(
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `car_id`     INT(11)      NOT NULL,
    `image_url`  VARCHAR(120) NULL     DEFAULT '',
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `car_id_index` (`car_id` ASC) VISIBLE,
    CONSTRAINT `pk_car_car_images`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `default_schema`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`favorites`
(
    `car_id`     INT(11)  NOT NULL,
    `user_id`    INT(11)  NOT NULL,
    `status`     INT(1)   NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`car_id`, `user_id`),
    CONSTRAINT `pk_cars_favorites`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON DELETE CASCADE
            ON UPDATE RESTRICT,
    CONSTRAINT `pk_users_favorites`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON DELETE CASCADE
            ON UPDATE RESTRICT
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

-- auto-generated definition
CREATE TABLE IF NOT EXISTS `default_schema`.`payment_statuses`
(
    `id`          INT(11)     NOT NULL AUTO_INCREMENT,
    `status`      VARCHAR(30) NOT NULL,
    `description` TEXT        NULL     DEFAULT '',
    `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `default_schema`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`payments`
(
    `id`                INT(11)        NOT NULL AUTO_INCREMENT,
    `rental_id`         INT(11)        NOT NULL,
    `payment_status_id` INT(11)        NOT NULL,
    `tax`               FLOAT          NOT NULL,
    `pay_date_time`     DATETIME       NOT NULL,
    `amount`            DECIMAL(10, 2) NOT NULL,
    `created_at`        DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`        DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `pk_rentals_payments`
        FOREIGN KEY (`rental_id`)
            REFERENCES `default_schema`.`rentals` (`id`)
            ON DELETE CASCADE
            ON UPDATE RESTRICT,
    CONSTRAINT `pk_payment_status_payments`
        FOREIGN KEY (`payment_status_id`)
            REFERENCES `default_schema`.`payment_statuses` (`id`)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`payment_add_charges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`payment_add_charges`
(
    `add_charges_id` INT(11)  NOT NULL,
    `payment_id`     INT(11)  NOT NULL,
    `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`add_charges_id`, `payment_id`),
    INDEX `pk_payment_ payment_add_charges` (`payment_id` ASC) VISIBLE,
    CONSTRAINT `pk_payment_ payment_add_charges`
        FOREIGN KEY (`payment_id`)
            REFERENCES `default_schema`.`payments` (`id`),
    CONSTRAINT `pk_add_charges_ payment_add_charges`
        FOREIGN KEY (`add_charges_id`)
            REFERENCES `default_schema`.`add_charges` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`car_prices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_prices`
(
    `id`             INT(11)        NOT NULL AUTO_INCREMENT,
    `car_id`         INT(11)        NOT NULL,
    `status`         ENUM ('Old', 'New')     DEFAULT 'New' NOT NULL,
    `rental_price`   DECIMAL(10, 2) NULL,
    `original_price` DECIMAL(10, 2) NULL,
    `from_date_time` DATETIME       NULL,
    `to_date_time`   DATETIME       NULL,
    `created_at`     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `car_id_index` (`car_id` ASC) VISIBLE,
    CONSTRAINT `pk_car_price`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`reviews`
(
    `car_id`     INT(11)  NOT NULL,
    `user_id`    INT(11)  NOT NULL,
    `rate`       INT(1)   NOT NULL,
    `comment`    TEXT     NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`car_id`, `user_id`),
    CONSTRAINT `pk_reviews_car_id`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON UPDATE RESTRICT
            ON DELETE CASCADE,
    CONSTRAINT `pk_reviews_user_id`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON UPDATE RESTRICT
            ON DELETE CASCADE
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`users_cars_coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`users_cars_coupons`
(
    `car_id`     INT(11)  NOT NULL,
    `coupon_id`  INT(11)  NOT NULL,
    `user_id`    INT(11)  NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`car_id`, `coupon_id`, `user_id`),
    INDEX `pk_users_users_cars_coupons` (`user_id` ASC) VISIBLE,
    INDEX `pk_coupons_users_cars_coupons` (`coupon_id` ASC) VISIBLE,
    CONSTRAINT `pk_cars_users_cars_coupons`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`),
    CONSTRAINT `pk_users_users_cars_coupons`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`),
    CONSTRAINT `pk_coupons_users_cars_coupons`
        FOREIGN KEY (`coupon_id`)
            REFERENCES `default_schema`.`coupons` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`notifications`
(
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `user_id`    INT(11)      NOT NULL,
    `title`      VARCHAR(255) NOT NULL,
    `message`    TEXT         NOT NULL,
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `pk_users_notifications` (`user_id` ASC) VISIBLE,
    CONSTRAINT `pk_users_notifications`
        FOREIGN KEY (`user_id`)
            REFERENCES `default_schema`.`users` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `default_schema`.`reservation_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`reservation_types`
(
    `id`          INT(11)     NOT NULL,
    `type`        VARCHAR(30) NOT NULL,
    `description` TEXT        NULL,
    `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `default_schema`.`car_reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`car_reservations`
(
    `id`                          INT(11)   NOT NULL,
    `customer_id`                 INT(11)   NOT NULL,
    `car_id`                      INT(11)   NOT NULL,
    `reservation_type_id`         INT(11)   NOT NULL,
    `admin_id`                    INT(11)   NULL,
    `reservation_start_date_time` DATETIME  NOT NULL,
    `reservation_end_date_time`   DATETIME  NOT NULL,
    `created_at`                  DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`                  TIMESTAMP NULL     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `aaaaaaaa_idx` (`customer_id` ASC) VISIBLE,
    INDEX `admin_idx` (`admin_id` ASC) VISIBLE,
    INDEX `car_idx` (`car_id` ASC) VISIBLE,
    INDEX `reservation_types_idx` (`reservation_type_id` ASC) VISIBLE,
    CONSTRAINT `pk_user_car_reservations_customer`
        FOREIGN KEY (`customer_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON DELETE NO ACTION
            ON UPDATE RESTRICT,
    CONSTRAINT `pk_user_car_reservations_admin`
        FOREIGN KEY (`admin_id`)
            REFERENCES `default_schema`.`users` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT `pk_cars_reservations_customer`
        FOREIGN KEY (`car_id`)
            REFERENCES `default_schema`.`cars` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT `pk_reservation_types_car_reservations`
        FOREIGN KEY (`reservation_type_id`)
            REFERENCES `default_schema`.`reservation_types` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `default_schema`.`coupons_cars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `default_schema`.`coupons_cars`
(
    `coupon_id`       INT(11)        NOT NULL,
    `car_id`          INT(11)        NOT NULL,
    `discount_value`  DECIMAL(10, 2) NOT NULL,
    `usage_count`     INT(3)         NOT NULL,
    `expiration_time` DATETIME       NOT NULL,
    `created_at`      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`      DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`coupon_id`, `car_id`),
    CONSTRAINT `pk_coupon_coupons_cars`
        FOREIGN KEY (`coupon_id`)
            REFERENCES `default_schema`.`coupons` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 1
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
