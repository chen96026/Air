-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-08 09:32:10
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
-- 資料庫: `air`
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
  `createDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_information`
--

INSERT INTO `order_information` (`Oid`, `order_number`, `contact_id`, `finalprice`, `createDate`) VALUES
(1, 'OD-1728269014059', 1, 15369, '2024-10-07 10:43:34'),
(2, 'OD-1728269153228', 2, 12921, '2024-10-07 10:45:53'),
(3, 'OD-1728271065870', 3, 12921, '2024-10-07 11:17:46'),
(4, 'OD-1728280287595', 4, 13394, '2024-10-07 13:51:28'),
(5, 'OD-1728280611243', 7, 12921, '2024-10-07 13:56:51'),
(6, 'OD-1728280816578', 8, 13395, '2024-10-07 14:00:17'),
(7, 'OD-1728281081213', 9, 13394, '2024-10-07 14:04:41'),
(8, 'OD-1728282043890', 10, 13395, '2024-10-07 14:20:44'),
(9, 'OD-1728282128025', 11, 13868, '2024-10-07 14:22:08'),
(10, 'OD-1728282302025', 12, 9999, '2024-10-07 14:25:02'),
(11, 'OD-1728285439850', 13, 12921, '2024-10-07 15:17:20'),
(12, 'OD-1728286082174', 14, 13394, '2024-10-07 15:28:02'),
(13, 'OD1728286404942', 15, 12921, '2024-10-07 15:33:25'),
(14, 'OD1728292631065', 16, 9999, '2024-10-07 17:17:11'),
(15, 'OD1728360194410', 17, 16317, '2024-10-08 12:03:14'),
(16, 'OD1728376117973', 18, 12921, '2024-10-08 16:28:38');

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
  MODIFY `Oid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
