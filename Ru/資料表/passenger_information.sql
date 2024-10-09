-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-08 09:32:37
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
-- 資料表結構 `passenger_information`
--

CREATE TABLE `passenger_information` (
  `Pid` int(10) UNSIGNED NOT NULL,
  `LastName` varchar(1000) NOT NULL,
  `FirstName` varchar(1000) NOT NULL,
  `Gender` varchar(1000) NOT NULL,
  `Birthday` date NOT NULL,
  `IdType` varchar(100) NOT NULL,
  `IdNumber` int(11) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `idDate` date NOT NULL,
  `Contact_Id` int(10) UNSIGNED NOT NULL,
  `Order_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `passenger_information`
--

INSERT INTO `passenger_information` (`Pid`, `LastName`, `FirstName`, `Gender`, `Birthday`, `IdType`, `IdNumber`, `Country`, `idDate`, `Contact_Id`, `Order_id`) VALUES
(1, 'EEEE', 'EEEE', 'male', '2024-10-03', 'passport', 111, 'tw', '2024-10-17', 1, 1),
(2, 'FFF', 'FFF', 'female', '2024-10-10', 'passport', 222, 'tw', '2024-10-17', 1, 1),
(3, 'AAA', 'AAA', 'male', '2024-10-16', 'passport', 1111, 'tw', '2024-10-03', 2, 2),
(4, 'GGG', 'GGG', 'male', '2024-10-10', 'passport', 333, 'tw', '2024-10-09', 3, 3),
(5, 'RRR', 'RRR', 'male', '2024-09-04', 'chinaId', 222, 'tw', '2024-10-24', 4, 4),
(6, 'eee', 'eee', 'male', '2024-10-01', 'passport', 111, 'tw', '2024-10-16', 7, 5),
(7, 'ddd', 'ddd', 'male', '2024-10-09', 'passport', 333, 'tw', '2024-10-16', 8, 6),
(8, 'eee', 'eee', 'male', '2024-10-09', 'passport', 1111, 'tw', '2024-10-31', 9, 7),
(9, 'rrr', 'rrr', 'male', '2024-11-07', 'passport', 333, 'tw', '2024-10-17', 10, 8),
(10, 'eee', 'eee', 'male', '2024-10-03', 'passport', 111, 'tw', '2024-10-22', 11, 9),
(11, 'ggg', 'ggg', 'male', '2024-10-30', 'passport', 222, 'tw', '2024-11-05', 12, 10),
(12, 'rrr', 'rrr', 'male', '2024-10-17', 'passport', 333, 'tw', '2024-10-15', 13, 11),
(13, 'ggg', 'gggg', 'male', '2024-10-25', 'passport', 222, 'tw', '2024-10-16', 14, 12),
(14, 'kkk', 'kkk', 'male', '2024-10-14', 'passport', 999, 'tw', '2024-10-16', 15, 13),
(15, 'rrr', 'rrr', 'male', '2024-10-09', 'passport', 333333333, 'tw', '2024-10-09', 17, 15),
(16, 'ddd', 'ddd', 'male', '2024-10-15', 'chinaId', 22222222, 'tw', '2024-10-16', 17, 15),
(17, 'ggg', 'gg', 'male', '2024-10-09', 'passport', 11111111, 'tw', '2024-10-31', 18, 16);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `passenger_information`
--
ALTER TABLE `passenger_information`
  ADD PRIMARY KEY (`Pid`),
  ADD KEY `contact_FK` (`Contact_Id`),
  ADD KEY `fk_oid` (`Order_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `passenger_information`
--
ALTER TABLE `passenger_information`
  MODIFY `Pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `passenger_information`
--
ALTER TABLE `passenger_information`
  ADD CONSTRAINT `contact_FK` FOREIGN KEY (`Contact_Id`) REFERENCES `contact_information` (`CId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_oid` FOREIGN KEY (`Order_id`) REFERENCES `order_information` (`Oid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
