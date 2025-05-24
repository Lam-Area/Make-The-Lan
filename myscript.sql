-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 24 mai 2025 à 15:43
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myscript`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_preview` text COLLATE utf8mb4_unicode_ci,
  `vendeur_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_vendeur_id_foreign` (`vendeur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `price`, `file_path`, `code_preview`, `vendeur_id`, `created_at`, `updated_at`) VALUES
(1, 'Script de scraping Python', 'Un script efficace pour scraper les données d’un site.', 19.99, 'scripts/scraper.py', 'import requests...', 2, '2025-05-22 14:39:48', '2025-05-22 14:39:48'),
(2, 'Template React + Inertia', 'Base solide pour démarrer un projet SPA avec Laravel.', 49.99, 'templates/react-starter.zip', '<script setup>', 1, '2025-05-22 14:39:48', '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `article_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_user_id_foreign` (`user_id`),
  KEY `cart_items_article_id_foreign` (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `article_id`, `created_at`) VALUES
(1, 1, 1, '2025-05-22 14:39:48'),
(2, 1, 2, '2025-05-22 14:39:48'),
(3, 2, 3, '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `article_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favorites_user_id_foreign` (`user_id`),
  KEY `favorites_article_id_foreign` (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `article_id`, `created_at`) VALUES
(1, 1, 1, '2025-05-22 14:39:48'),
(2, 1, 2, '2025-05-22 14:39:48'),
(3, 2, 1, '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `sender_id` bigint UNSIGNED NOT NULL,
  `receiver_id` bigint UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_sender_id_foreign` (`sender_id`),
  KEY `messages_receiver_id_foreign` (`receiver_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `read_at`, `created_at`) VALUES
(1, 1, 2, 'Salut ! Tu es dispo pour une démo ?', '2025-05-22 14:44:48', '2025-05-22 14:39:48'),
(2, 2, 1, 'Yes, go maintenant.', NULL, '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_04_25_003657_create_sessions_table', 1),
(2, '2025_05_06_073427_create_users_table', 1),
(3, '2025_05_06_074006_create_articles_table', 1),
(4, '2025_05_06_075436_create_orders_table', 1),
(5, '2025_05_06_075657_create_order_items_table', 1),
(6, '2025_05_06_080048_create_cart_items_table', 1),
(7, '2025_05_06_080345_create_favorites_table', 1),
(8, '2025_05_06_080544_create_messages_table', 1),
(9, '2025_05_06_080705_create_user_preferences_table', 1),
(10, '2025_05_06_080806_create_user_logs_table', 1),
(11, '2025_05_21_130845_create_cache_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `created_at`) VALUES
(1, 1, 69.98, '2025-05-22 14:39:48'),
(2, 2, 19.99, '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `article_id` bigint UNSIGNED NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_article_id_foreign` (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `article_id`, `price_at_purchase`, `created_at`) VALUES
(1, 1, 1, 19.99, '2025-05-22 12:39:48'),
(2, 1, 2, 49.99, '2025-05-22 12:39:48'),
(3, 2, 1, 19.99, '2025-05-22 12:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('CpjTNmwJ6wIiY2oYG9kouL6qaDg2oNUWH3VvL49a', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTdJZ3BGRHA4TXYwRXJGYTMyeWJ4U1NkREptaDdCZkpIMmZoN3hJWCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9', 1748010036),
('ghfE5SZer61verreTtZcuAJrH6AeUZjYMSHz7Bcc', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXVuOEhqNmhKbzlhV29oSnlGNVNQZ2FUelZPZ1hmbGVJc1dXS3BNbiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1747924896);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','vendeur','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Test', 'admin@myscript.com', '$2y$12$8OpsZGBMp8PAOXH5dgo8wOn21SMOU/ou1AsWfD98IyC3ROt7O/uwS', 'admin', '2025-05-22 14:39:47', '2025-05-22 14:39:47'),
(2, 'Vendeur Test', 'vendeur@myscript.com', '$2y$12$3TpHp1p.PwzD.TqB9YJ5Nu33NCh9LqPwwbbg7eckqNF2AU63uZpvm', 'vendeur', '2025-05-22 14:39:48', '2025-05-22 14:39:48'),
(3, 'User Test', 'user@myscript.com', '$2y$12$a1o3.ZNRIIHvT09rLhW1x./3eOZ6i08OX2bCcdylHn5kBUInqBy.S', 'user', '2025-05-22 14:39:48', '2025-05-22 14:39:48');

-- --------------------------------------------------------

--
-- Structure de la table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
CREATE TABLE IF NOT EXISTS `user_logs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_logs_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_logs`
--

INSERT INTO `user_logs` (`id`, `user_id`, `name`, `action`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 1, 'Admin Test', 'Connexion', '192.168.1.1', '2025-05-22 12:39:48', NULL),
(2, 2, 'Vendeur Test', 'Déconnexion', '192.168.1.2', '2025-05-22 12:39:48', NULL),
(3, 1, 'Admin Test', 'Connexion réussie', '127.0.0.1', '2025-05-22 12:40:37', '2025-05-22 12:40:37'),
(4, 1, 'Admin Test', 'Déconnexion', '127.0.0.1', '2025-05-22 12:41:22', '2025-05-22 12:41:22'),
(5, 1, 'Admin Test', 'Connexion réussie', '127.0.0.1', '2025-05-22 12:41:36', '2025-05-22 12:41:36'),
(6, 1, 'Admin Test', 'Connexion réussie', '127.0.0.1', '2025-05-23 11:24:05', '2025-05-23 11:24:05'),
(7, 1, 'Admin Test', 'Déconnexion', '127.0.0.1', '2025-05-23 11:30:01', '2025-05-23 11:30:01'),
(8, 3, 'User Test', 'Connexion réussie', '127.0.0.1', '2025-05-23 11:30:51', '2025-05-23 11:30:51'),
(9, 3, 'User Test', 'Déconnexion', '127.0.0.1', '2025-05-23 12:20:08', '2025-05-23 12:20:08'),
(10, 2, 'Vendeur Test', 'Connexion réussie', '127.0.0.1', '2025-05-23 12:20:29', '2025-05-23 12:20:29');

-- --------------------------------------------------------

--
-- Structure de la table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `dark_mode` tinyint(1) NOT NULL,
  `language` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_email` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_preferences_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_preferences`
--

INSERT INTO `user_preferences` (`id`, `user_id`, `dark_mode`, `language`, `notification_email`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'fr', 1, '2025-05-22 12:39:48', '2025-05-22 12:39:48'),
(2, 2, 0, 'en', 0, '2025-05-22 12:39:48', '2025-05-22 12:39:48');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
