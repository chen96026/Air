-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-11 02:26:04
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
-- 資料表結構 `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '旅遊國家(必填)',
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '旅遊地區(必填)',
  `startDate` date DEFAULT NULL COMMENT '旅遊起始日',
  `endDate` date DEFAULT NULL COMMENT '旅遊結束日',
  `mainTitle` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '主標題(必填)',
  `subTitle` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '副標題',
  `tags` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'HashTags',
  `rate` int(10) UNSIGNED NOT NULL COMMENT '評分星數(必填)',
  `share` tinyint(1) NOT NULL COMMENT '是否願意分享到首頁',
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章內容(必填)',
  `authorId` int(10) UNSIGNED NOT NULL COMMENT '作者id(外鍵連接member.uid)',
  `createdTime` datetime NOT NULL COMMENT 'PO文日期',
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `posts`
--

INSERT INTO `posts` (`id`, `country`, `city`, `startDate`, `endDate`, `mainTitle`, `subTitle`, `tags`, `rate`, `share`, `content`, `authorId`, `createdTime`, `status`) VALUES
(1, '日本', '東京', '2024-10-06', '2024-10-31', '超級可愛的熊本熊!', '印象深刻的活火山之旅~', '熊本,東京', 4, 1, '終於看到心心念念的熊本熊!\r\n現場拍真的是超~~~~大一隻😆😆🤣🤣\r\n除此之外，沒想到熊本的食物都超級好吃！\r\n除了拉麵以外，還有超級有名的赤牛丼都好吃到回國了還在想念👍👍\r\n不過另一個名產生馬肉......抱歉我還是沒辦法\r\n這超過我的生理界線了😜\r\n\r\n景點的重點活火山，光是路途中的山景就讓人覺得不虛此行，日本的山水風景真的都太好看了🤩\r\n還有印象深刻的熊本城和水前寺成趣園\r\n整個日式氣味迎面而來，走在裡面都像是看日本時代劇一樣！\r\n\r\n這趟旅程真的太開心了，到熊本的朋友一定要嘗嘗他們的赤牛丼🤤🤤🤤', 2, '2024-10-08 02:25:10', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `authorId` FOREIGN KEY (`authorId`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
