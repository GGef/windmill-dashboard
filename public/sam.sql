-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2023 at 10:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sam`
--

-- --------------------------------------------------------

--
-- Table structure for table `charge`
--

CREATE TABLE `charge` (
  `id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `statut` varchar(255) NOT NULL,
  `montant` decimal(8,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'maroc');

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `item_leased_id` int(11) NOT NULL,
  `grade_category_id` int(11) NOT NULL,
  `user_from` int(11) NOT NULL,
  `user_to` int(11) NOT NULL,
  `grade` decimal(3,1) NOT NULL,
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grade_category`
--

CREATE TABLE `grade_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(64) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `who_grades` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `item_location` text NOT NULL,
  `description` text NOT NULL,
  `owner_id` int(11) NOT NULL,
  `price_per_unit` decimal(8,2) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `avaible` varchar(10) DEFAULT NULL,
  `titrePropriete` varchar(255) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `item_name`, `item_type_id`, `location_id`, `item_location`, `description`, `owner_id`, `price_per_unit`, `unit_id`, `avaible`, `titrePropriete`, `date_creation`) VALUES
(8508, 'bayti3', 2, 5, 'salam', 'aaaaeaeeaeea', 29, 10000.00, 4, '', '', '2023-07-07 13:53:57'),
(8324, 'bayti1', 2, 5, 'salam', 'aaaaeaeeaeea', 16, 10000.00, 4, '', '', '2023-07-07 13:53:57'),
(8187, 'yyyyyyy', 2, 4, 'salam', 'uhaGBQ', 3, 5555.00, 5, '', '', '2023-08-10 13:53:57'),
(8449, 'ddd', 2, 5, 'hau', 'alke', 19, 6564.00, 5, NULL, '', '2023-02-12 14:53:57'),
(8450, 'apapapaaaa', 1, 4, 'LA', '0..............................0..................0', 17, 500.00, 4, NULL, '', '2023-08-24 13:58:32'),
(2323, 'Ahmed2', 2, 5, 'villa', 'dsdqsfdq', 18, 6555.00, 5, NULL, '', '2023-09-05 02:19:17'),
(8505, 'bayti2', 2, 5, 'salam', 'aaaaeaeeaeea', 21, 10000.00, 4, NULL, '', '2023-07-07 13:53:57'),
(8506, 'Ahmed', 2, 5, 'Casablanca', 'appartement', 23, 6000.00, 4, NULL, '', '2023-07-07 13:53:57');

-- --------------------------------------------------------

--
-- Table structure for table `item_leased`
--

CREATE TABLE `item_leased` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `renter_id` int(11) NOT NULL,
  `time_from` datetime NOT NULL,
  `time_to` datetime NOT NULL,
  `unit_id` int(11) NOT NULL,
  `price_per_unit` decimal(8,2) NOT NULL,
  `discount` decimal(8,2) NOT NULL,
  `fee` decimal(8,2) NOT NULL,
  `price_total` decimal(8,2) NOT NULL,
  `rentier_grade_description` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_leased`
--

INSERT INTO `item_leased` (`id`, `item_id`, `renter_id`, `time_from`, `time_to`, `unit_id`, `price_per_unit`, `discount`, `fee`, `price_total`, `rentier_grade_description`) VALUES
(1, 8324, 14, '2023-05-02 11:21:09', '2024-01-04 11:21:09', 5, 9999.00, 200.00, 0.00, 9799.00, 'nice'),
(5, 8446, 17, '2023-08-10 16:45:33', '2023-09-20 12:45:45', 5, 200.00, 21.00, 0.00, 4200.00, '...........\r\n'),
(4, 8449, 25, '2023-05-08 11:21:09', '2024-10-01 12:00:00', 4, 2422.00, 200.00, 0.00, 2222.00, 'nice'),
(6, 8450, 21, '2023-08-25 13:24:01', '2023-12-02 15:24:01', 4, 400.00, 10.00, 0.00, 4000.00, 'n,i,ik\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `item_type`
--

CREATE TABLE `item_type` (
  `id` int(11) NOT NULL,
  `type_name` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_type`
--

INSERT INTO `item_type` (`id`, `type_name`) VALUES
(1, 'appartement\r\n'),
(2, 'villa\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `postal_code` varchar(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `postal_code`, `name`, `description`, `country_id`) VALUES
(4, '46546', 'oujda', 'scfehg, qsdfg', 1),
(1, '46546', 'essaouira', 'sdftuiogfd', 1),
(5, '11997', 'Casablanca', 'qsrtyuivsddnsduhfuetrg', 1),
(7, '179956', 'Rabat', 'zDJBzjrgz', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `type_role` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `type_role`) VALUES
(1, 'Administrateur'),
(2, 'Propriétaire'),
(3, 'Locataire');

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(64) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `unit_name`) VALUES
(5, 'sedrtyuikolp'),
(4, 'azerty\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `registration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`id`, `role_id`, `location_id`, `username`, `password`, `phone`, `mobile`, `email`, `registration_time`) VALUES
(1, 1, 4, 'yousra', 'gghhyygg', '0694268432', '0654471147', 'yousra@gmail.com', '2023-07-17 10:31:12'),
(16, 2, 1, 'marouane', 'password', '0695173726', '178921548', 'marouane@gmail.com', '2023-05-17 10:31:12'),
(3, 2, 4, 'maha', 'mphus', '0678952134', '0522106644', 'maha@gmail.com', '2023-07-16 11:47:00'),
(19, 2, 5, 'hamza', 'azertuio', '0678995566', '0545123698', 'hamza@gmail.com', '2023-07-17 12:42:11'),
(15, 2, 7, 'simo', 'cggg', '178921548', '178921548', 'simobr100@gmail.com', '2023-07-17 10:31:12'),
(17, 3, 5, 'wissal', 'azerty', '0678963102', '0522361455', 'wissal@gmail.com', '2023-07-17 10:31:12'),
(14, 3, 7, 'simobr05', '44', '0695173726', '0695173726', 'mar@gmail.com', '2023-07-17 10:31:12'),
(18, 3, 4, 'aajli', 'qwerty', '178921548', '178921548', 'ji@h', '2023-07-17 10:31:12'),
(21, 3, 5, 'aajlidcdcd', 'ddcdcdcd', '178921548', '178921548', 'ji@hccs', '2023-06-26 08:50:00'),
(20, 2, 1, 'amin', 'azertyu', '0696812339', '178921548', 'barhmiyousra@gmail.com', '2023-07-17 11:48:35'),
(22, 2, 5, 'boubou', 'gbcvc', '0695173726', '0696812339', 'boubou@gmail.com', '2023-06-27 10:42:00'),
(23, 2, 4, 'chaimaa', 'cc', '178921548', '0696812339', 'chaimaa@gmail.ma', '2023-07-25 10:42:40'),
(29, 2, 5, 'halima', 'boubou', '0645395427', '0500000000', 'halima@gmail.com', '2023-07-28 15:43:00'),
(25, 3, 7, 'sabrina', 'jjjj', '067841288', '0578661598', 'maj@gmail.com', '2023-07-29 16:17:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `charge`
--
ALTER TABLE `charge`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_unit_id` (`unit_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_leased_id` (`item_leased_id`),
  ADD KEY `fk_grade_category_id` (`grade_category_id`),
  ADD KEY `fk_user_from` (`user_from`),
  ADD KEY `fk_user_to` (`user_to`);

--
-- Indexes for table `grade_category`
--
ALTER TABLE `grade_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_type_id` (`item_type_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_type_id` (`item_type_id`),
  ADD KEY `fk_location_id` (`location_id`),
  ADD KEY `fk_owner_id` (`owner_id`),
  ADD KEY `fk_unit_id` (`unit_id`);

--
-- Indexes for table `item_leased`
--
ALTER TABLE `item_leased`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_id` (`item_id`),
  ADD KEY `fk_unit_id` (`unit_id`),
  ADD KEY `fk_renter_id` (`renter_id`);

--
-- Indexes for table `item_type`
--
ALTER TABLE `item_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `charge`
--
ALTER TABLE `charge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grade_category`
--
ALTER TABLE `grade_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8509;

--
-- AUTO_INCREMENT for table `item_leased`
--
ALTER TABLE `item_leased`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `item_type`
--
ALTER TABLE `item_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
