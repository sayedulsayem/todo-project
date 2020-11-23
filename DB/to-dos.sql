-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `to-dos`;
CREATE TABLE `to-dos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('active','completed') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `to-dos` (`id`, `name`, `status`) VALUES
(16,	'Item 1',	'active'),
(17,	'Item 2 Edit',	'active'),
(18,	'Item 3',	'active');

-- 2020-11-23 16:59:28
