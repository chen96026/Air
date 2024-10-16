-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-16 03:25:11
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
-- 資料表結構 `contact_information`
--

CREATE TABLE `contact_information` (
  `CId` int(10) UNSIGNED NOT NULL,
  `ContactName` varchar(1000) NOT NULL,
  `ContactPhone` varchar(15) NOT NULL,
  `ContactEmail` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `contact_information`
--

INSERT INTO `contact_information` (`CId`, `ContactName`, `ContactPhone`, `ContactEmail`) VALUES
(1, 'EEE', '111', 'EEE'),
(2, 'AAA', '111', 'AAA'),
(3, 'WWW', '111', 'WWW'),
(4, 'RRR', '222', 'RRR'),
(5, 'vvv', '333', 'vvv'),
(6, 'rrr', '333', 'rrr'),
(7, 'eee', '111', 'eee'),
(8, 'ddd', '333', 'ddd'),
(9, 'ddd', '333', 'ddd'),
(10, 'eee', '111', 'eee'),
(11, 'eee', '111', 'eee'),
(12, 'ggg', '222', 'ggg'),
(13, 'eee', '111', 'eee'),
(14, 'ggg', '222', 'ggg'),
(15, 'kkk', '999', 'kkk'),
(16, 'd', '33', ''),
(17, 'dd', '0912-123456', 'ss@gmail.com'),
(18, 'ooo', '11111111111', '111@gmail.com'),
(19, 'aaa', '0905599825', 'noway2266@gmail.com'),
(20, 'bbb', '0905599825', 'noway2266@gmail.com'),
(21, 'bbb', '0905599825', 'noway2266@gmail.com'),
(22, 'aaa', '0905599825', 'noway2266@gmail.com'),
(23, 'aaa', '0905599825', 'noway2266@gmail.com'),
(24, 'aaa', '0905599825', 'aaa@gmail.com'),
(25, 'aaa', '0905599825', 'noway2266@gmail.com'),
(26, 'aaa', '0905599825', 'noway2266@gmail.com'),
(27, 'aaa', '0905599825', 'noway2266@gmail.com'),
(28, 'aaa', '0905599825', 'noway2266@gmail.com'),
(29, 'adasd', '0905599825', 'noway2266@gmail.com'),
(30, 'adasd', '0905599825', 'noway2266@gmail.com'),
(31, 'asdasd', '0905599825', 'noway2266@gmail.com'),
(32, 'asdasd', '0905599825', 'noway2266@gmail.com'),
(33, 'aaa', '0905599825', 'noway2266@gmail.com'),
(34, 'aaa', '0905599825', 'noway2266@gmail.com'),
(35, 'adas', '0905599825', 'noway2266@gmail.com'),
(36, 'adas', '0905599825', 'noway2266@gmail.com');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `contact_information`
--
ALTER TABLE `contact_information`
  ADD PRIMARY KEY (`CId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `contact_information`
--
ALTER TABLE `contact_information`
  MODIFY `CId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
