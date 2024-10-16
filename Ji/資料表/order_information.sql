-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-16 03:25:29
-- 伺服器版本： 5.7.24
-- PHP 版本： 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `order_information`
--

CREATE TABLE `order_information` (
  `Oid` int(10) UNSIGNED NOT NULL,
  `order_number` varchar(1000) NOT NULL,
  `contact_id` int(10) UNSIGNED NOT NULL,
  `finalprice` double UNSIGNED NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `orderStatus` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_information`
--

INSERT INTO `order_information` (`Oid`, `order_number`, `contact_id`, `finalprice`, `createDate`, `orderStatus`) VALUES
(1, 'OD-1728269014059', 1, 15369, '2024-10-07 10:43:34', NULL),
(2, 'OD-1728269153228', 2, 12921, '2024-10-07 10:45:53', NULL),
(3, 'OD-1728271065870', 3, 12921, '2024-10-07 11:17:46', NULL),
(4, 'OD-1728280287595', 4, 13394, '2024-10-07 13:51:28', NULL),
(5, 'OD-1728280611243', 7, 12921, '2024-10-07 13:56:51', NULL),
(6, 'OD-1728280816578', 8, 13395, '2024-10-07 14:00:17', NULL),
(7, 'OD-1728281081213', 9, 13394, '2024-10-07 14:04:41', NULL),
(8, 'OD-1728282043890', 10, 13395, '2024-10-07 14:20:44', NULL),
(9, 'OD-1728282128025', 11, 13868, '2024-10-07 14:22:08', NULL),
(10, 'OD-1728282302025', 12, 9999, '2024-10-07 14:25:02', NULL),
(11, 'OD-1728285439850', 13, 12921, '2024-10-07 15:17:20', NULL),
(12, 'OD-1728286082174', 14, 13394, '2024-10-07 15:28:02', NULL),
(13, 'OD1728286404942', 15, 12921, '2024-10-07 15:33:25', NULL),
(14, 'OD1728292631065', 16, 9999, '2024-10-07 17:17:11', NULL),
(15, 'OD1728360194410', 17, 16317, '2024-10-08 12:03:14', NULL),
(16, 'OD1728376117973', 18, 12921, '2024-10-08 16:28:38', NULL),
(17, 'OD1728611045732', 19, 40763, '2024-10-11 09:44:06', NULL),
(18, 'OD1728611124008', 20, 40977, '2024-10-11 09:45:24', NULL),
(19, 'OD1728620489113', 21, 29611, '2024-10-11 12:21:29', NULL),
(20, 'OD1728634029858', 22, 29611, '2024-10-11 16:07:10', NULL),
(21, 'OD1729041995567', 27, 40748, '2024-10-16 09:26:36', '訂單已成立'),
(22, 'OD1729043337037', 29, 14587, '2024-10-16 09:48:57', '訂單已成立'),
(23, 'OD1729043586384', 31, 18647, '2024-10-16 09:53:06', '訂單已成立'),
(24, 'OD1729043756721', 33, 20049, '2024-10-16 09:55:57', '訂單已成立'),
(25, 'OD1729044259897', 35, 9289, '2024-10-16 10:04:20', '訂單已成立');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_information`
--
ALTER TABLE `order_information`
  ADD PRIMARY KEY (`Oid`),
  ADD KEY `fk_order_contact` (`contact_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_information`
--
ALTER TABLE `order_information`
  MODIFY `Oid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `order_information`
--
ALTER TABLE `order_information`
  ADD CONSTRAINT `fk_order_contact` FOREIGN KEY (`contact_id`) REFERENCES `contact_information` (`CId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
