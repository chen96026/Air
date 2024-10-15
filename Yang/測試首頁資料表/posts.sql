-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-14 03:45:51
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
  `authorId` bigint(10) UNSIGNED NOT NULL COMMENT '作者id(外鍵連接user.id)',
  `createdTime` datetime NOT NULL COMMENT 'PO文日期',
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `posts`
--

INSERT INTO `posts` (`id`, `country`, `city`, `startDate`, `endDate`, `mainTitle`, `subTitle`, `tags`, `rate`, `share`, `content`, `authorId`, `createdTime`, `status`) VALUES
(1, '日本', '京都', '2024-10-15', '2024-10-23', '超級迷人的京都之旅！', NULL, '京都旅行,紅葉季', 5, 1, '終於來到了心心念念的京都！\r\n看到滿滿的紅葉，現場真的美到不行🍁✨～不論是金閣寺的倒影，還是嵐山的竹林，每一個角落都像幅畫一樣。📸\r\n除了美景之外，京都的食物也超棒！😋\r\n不只有抹茶甜點讓人上癮，還有道地的湯豆腐和懷石料理，都好吃得讓人難忘～🥢', 66, '2024-10-16 11:08:56', 1),
(2, '法國', '巴黎', '2024-10-16', '2024-10-18', '巴黎的浪漫藝術之旅', NULL, '巴黎之旅,艾菲爾鐵塔,浪漫之都', 4, 1, '塞納河畔的夕陽，艾菲爾鐵塔的燈光，浪漫指數爆表💫。白天在羅浮宮欣賞藝術，晚上在香榭麗舍大道享受晚餐，整個行程夢幻極了。🥐巴黎的可頌和馬卡龍真的值得一試！', 63, '2024-10-25 11:16:40', 1),
(3, '美國', '紐約', '2024-10-17', '2024-10-19', '紐約的都市探險', NULL, '紐約旅行', 4, 1, '一天走在繁華的第五大道，一天在中央公園放鬆，紐約讓人應接不暇！🌆還參觀了大都會博物館，感受到濃濃的文化氣息。比薩、漢堡和芝士蛋糕都不能錯過～🍕🍔', 63, '2024-10-24 11:18:38', 1),
(4, '澳洲', '雪梨', '2024-10-10', '2024-10-12', '雪梨的海港之美', NULL, '雪梨旅行,邦迪海灘', 5, 1, '悉尼歌劇院的建築真的太壯觀了！在海港大橋上俯瞰全景，感覺就像置身天堂🌊。還去了邦迪海灘，陽光和沙灘讓人完全放鬆～🐠海鮮料理也超級鮮美！', 64, '2024-10-26 11:20:22', 1),
(5, '冰島', '冰島', '2024-10-15', '2024-10-17', '冰島的極光追尋', NULL, '冰島極光,自然之旅,自然之旅,自然之旅 ', 4, 1, '冰島的自然景觀真是讓人震撼！在藍湖溫泉泡湯後，夜晚迎來了極光的驚喜✨。還參觀了瀑布和火山，這趟旅程充滿大自然的奇蹟～', 65, '2024-10-23 11:22:35', 1),
(6, '義大利', '羅馬', '2024-10-17', '2024-10-25', '義大利的美食與歷史之旅', NULL, '義大利之旅,義大利之旅,義大利之旅,義大利之旅,義大利之旅,義大利之旅,義大利之旅', 5, 1, '在羅馬鬧區品嚐道地義大利麵和披薩，感覺每一口都像在品味藝術🍝。走訪了古羅馬競技場和梵蒂岡博物館，歷史氣息撲面而來～🇮🇹', 67, '2024-10-29 11:27:43', 1),
(7, '泰國', '曼谷', '2024-10-22', '2024-10-24', '泰國的熱帶探險', NULL, '泰國旅行,泰國旅行,泰國旅行,泰國旅行,泰國旅行', 4, 1, '曼谷街頭的夜市真的太精彩了！🌶️品嚐了泰式炒河粉和芒果糯米飯後，還去拜訪了大皇宮和玉佛寺，感受到濃厚的文化氣息。接著前往普吉島的海灘享受假期～🏝️', 68, '2024-10-26 11:28:39', 1),
(8, '埃及\r\n', '開羅', '2024-10-10', '2024-10-12', '埃及的金字塔之旅', NULL, '埃及旅行', 5, 1, '終於看到傳說中的金字塔和獅身人面像，震撼無法言喻！🌄參觀了開羅博物館，見識到法老的珍寶和木乃伊。尼羅河上的郵輪晚餐更是讓人回味無窮～', 69, '2024-10-19 11:29:47', 1),
(9, '美國', '夏威夷', '2024-10-15', '2024-10-17', '夏威夷的熱情海風', NULL, '夏威夷旅行夏威夷旅行夏威夷旅行夏威夷旅行夏威夷旅行', 5, 1, '在威基基海灘迎著浪花玩衝浪🏄‍♂️，感受夏威夷的熱情。火山國家公園的景觀也讓人嘆為觀止！夜晚品嚐波奇碗和夏威夷當地特色餐，這裡真的是天堂～🌴', 70, '2024-10-27 11:30:36', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postAuthor` (`authorId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `postAuthor` FOREIGN KEY (`authorId`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
