-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-09-26 17:37:05
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
-- 資料庫: `test`
--

-- --------------------------------------------------------

--
-- 資料表結構 `images`
--

CREATE TABLE `images` (
  `id` int(10) UNSIGNED NOT NULL,
  `pid` int(10) UNSIGNED NOT NULL COMMENT '文章id(外鍵連接posts.id)',
  `image` mediumblob NOT NULL COMMENT '附圖',
  `mimeType` varchar(100) NOT NULL COMMENT '圖片格式'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `country` varchar(100) NOT NULL COMMENT '旅遊國家(必填)',
  `city` varchar(100) NOT NULL COMMENT '旅遊地區(必填)',
  `startDate` date DEFAULT NULL COMMENT '旅遊起始日',
  `endDate` date DEFAULT NULL COMMENT '旅遊結束日',
  `mainTitle` varchar(100) NOT NULL COMMENT '主標題(必填)',
  `subTitle` varchar(100) DEFAULT NULL COMMENT '副標題',
  `tags` varchar(1000) DEFAULT NULL COMMENT 'HashTags',
  `rate` int(10) UNSIGNED NOT NULL COMMENT '評分星數(必填)',
  `share` tinyint(1) NOT NULL COMMENT '是否願意分享到首頁',
  `content` varchar(1000) NOT NULL COMMENT '文章內容(必填)',
  `authorId` int(10) UNSIGNED NOT NULL COMMENT '作者id(外鍵連接user.id)',
  `createdTime` datetime NOT NULL COMMENT 'PO文日期',
  `likes` int(10) NOT NULL DEFAULT '0' COMMENT '讚數',
  `reports` int(10) NOT NULL DEFAULT '0' COMMENT '被檢舉次數'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `usertest1`
--

CREATE TABLE `usertest1` (
  `id` int(10) UNSIGNED NOT NULL,
  `account` varchar(100) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `userIcon` blob,
  `mimeType` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `usertest1`
--

INSERT INTO `usertest1` (`id`, `account`, `passwd`, `username`, `userIcon`, `mimeType`) VALUES
(1, 'satoshi', '123456', '從真新鎮出發27年', NULL, NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`) USING BTREE;

--
-- 資料表索引 `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

--
-- 資料表索引 `usertest1`
--
ALTER TABLE `usertest1`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `usertest1`
--
ALTER TABLE `usertest1`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `usertest1` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
