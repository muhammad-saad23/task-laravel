-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307:3307
-- Generation Time: Nov 02, 2025 at 07:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('admin','subadmin','customer') NOT NULL DEFAULT 'customer',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `email`, `phone`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `created_by`) VALUES
(1, 'admin', 'Muhammad saad', 'Mssaad@gmail.com', '03152458881', NULL, '$2y$12$swiOMA393I8iIMzSNMYtw.cVBRdQfr3yKeX6AEHuzlPW/K1eOcIzG', NULL, '2025-11-01 14:48:33', '2025-11-01 14:48:33', NULL),
(2, 'subadmin', 'Muhammad saad', 'ms22458881@gmail.com', '03122458881', NULL, '$2y$12$qGghasEHzhbYuLJyU7yXn.mriPhHvy5kZLfjcuKVeQCUtmcFsCNP6', NULL, '2025-11-02 05:18:30', '2025-11-02 05:18:30', NULL),
(3, 'customer', 'hasan', 'hasan@email.com', '03152428881', NULL, '$2y$12$PeOhkHeme2ZRe0UEj3exsO2lFUggKaN9aghiyVn.9RHtia.BgUXg2', NULL, '2025-11-02 05:27:18', '2025-11-02 05:27:18', 2),
(4, 'subadmin', 'fahad junaid', 'fahad@gmail.com', '03352458881', NULL, '$2y$12$1wDcW78Fno3l10161XnnweA8wV3zAKr1hDOftewEtF8BrnNdV87Iy', NULL, '2025-11-02 05:34:13', '2025-11-02 05:34:13', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_created_by_foreign` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
