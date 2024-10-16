-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-16 03:25:25
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
-- 資料表結構 `luggage`
--

CREATE TABLE `luggage` (
  `LId` int(10) UNSIGNED NOT NULL,
  `TripType` enum('outbound','return') NOT NULL,
  `AdditionalLuggage` varchar(50) NOT NULL,
  `LgPrice` int(11) NOT NULL,
  `PassengerId` int(10) UNSIGNED DEFAULT NULL,
  `OrderId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `luggage`
--

INSERT INTO `luggage` (`LId`, `TripType`, `AdditionalLuggage`, `LgPrice`, `PassengerId`, `OrderId`) VALUES
(80, 'outbound', 'one_lg', 1224, 1, 1),
(81, 'return', 'one_lg', 1224, 1, 1),
(82, 'outbound', 'one_lg', 1224, 2, 1),
(83, 'return', 'two_lg', 1698, 2, 1),
(84, 'outbound', 'one_lg', 1224, 3, 2),
(85, 'return', 'two_lg', 1698, 3, 2),
(86, 'outbound', 'one_lg', 1224, 4, 3),
(87, 'return', 'two_lg', 1698, 4, 3),
(88, 'outbound', 'one_lg', 1224, 5, 4),
(89, 'return', 'three_lg', 2171, 5, 4),
(90, 'outbound', 'one_lg', 1224, 6, 5),
(91, 'return', 'two_lg', 1698, 6, 5),
(92, 'outbound', 'two_lg', 1698, 7, 6),
(93, 'return', 'two_lg', 1698, 7, 6),
(94, 'outbound', 'one_lg', 1224, 8, 7),
(95, 'return', 'three_lg', 2171, 8, 7),
(96, 'outbound', 'two_lg', 1698, 9, 8),
(97, 'return', 'two_lg', 1698, 9, 8),
(98, 'outbound', 'two_lg', 1698, 10, 9),
(99, 'return', 'three_lg', 2171, 10, 9),
(100, 'outbound', 'one_lg', 1224, 12, 11),
(101, 'return', 'two_lg', 1698, 12, 11),
(102, 'outbound', 'one_lg', 1224, 13, 12),
(103, 'return', 'three_lg', 2171, 13, 12),
(104, 'outbound', 'one_lg', 1224, 14, 13),
(105, 'return', 'two_lg', 1698, 14, 13),
(106, 'outbound', 'one_lg', 1224, 15, 15),
(107, 'return', 'two_lg', 1698, 15, 15),
(108, 'outbound', 'two_lg', 1698, 16, 15),
(109, 'return', 'two_lg', 1698, 16, 15),
(110, 'outbound', 'one_lg', 1224, 17, 16),
(111, 'return', 'two_lg', 1698, 17, 16),
(112, 'outbound', 'non_lg', 0, 18, 17),
(113, 'return', 'non_lg', 0, 18, 17),
(114, 'outbound', 'non_lg', 0, 19, 18),
(115, 'return', 'non_lg', 0, 19, 18),
(116, 'outbound', 'non_lg', 0, 20, 19),
(117, 'return', 'non_lg', 0, 20, 19),
(118, 'outbound', 'non_lg', 0, 21, 20),
(119, 'return', 'non_lg', 0, 21, 20),
(120, 'outbound', 'non_lg', 0, 22, 21),
(121, 'return', 'non_lg', 0, 22, 21),
(122, 'outbound', 'non_lg', 0, 23, 22),
(123, 'return', 'non_lg', 0, 23, 22),
(124, 'outbound', 'non_lg', 0, 24, 23),
(125, 'return', 'non_lg', 0, 24, 23),
(126, 'outbound', 'non_lg', 0, 25, 24),
(127, 'return', 'non_lg', 0, 25, 24),
(128, 'outbound', 'non_lg', 0, 26, 25),
(129, 'return', 'non_lg', 0, 26, 25);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `luggage`
--
ALTER TABLE `luggage`
  ADD PRIMARY KEY (`LId`),
  ADD KEY `fk_luggage_passenger` (`PassengerId`),
  ADD KEY `fk_luggage_order` (`OrderId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `luggage`
--
ALTER TABLE `luggage`
  MODIFY `LId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `luggage`
--
ALTER TABLE `luggage`
  ADD CONSTRAINT `fk_luggage_order` FOREIGN KEY (`OrderId`) REFERENCES `order_information` (`Oid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_luggage_passenger` FOREIGN KEY (`PassengerId`) REFERENCES `passenger_information` (`Pid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
