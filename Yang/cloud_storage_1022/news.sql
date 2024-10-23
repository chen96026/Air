-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-23 01:19:18
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
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(1000) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `imgurl` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`id`, `title`, `text`, `url`, `imgurl`) VALUES
(2, '紐西蘭羅托魯瓦奇景宛如外星球？', '因為擁有罕見的地熱和獨特的地貌，加上珍稀的動植物，位於紐西蘭北島中部的羅托魯瓦（Rotorua），猶如外星世界般引人注目。\r\n此外，當地一半居民為毛利人，豐富的原住民歷史與傳說更增添亮點，每年都吸引將近百萬名遊客造訪。', 'https://tw.news.yahoo.com/%E7%B4%90%E8%A5%BF%E8%98%AD%E7%BE%85%E6%89%98%E9%AD%AF%E7%93%A6%E5%A5%87%E6%99%AF%E5%AE%9B%E5%A6%82%E5%A4%96%E6%98%9F%E7%90%83%EF%BC%9F%EF%BC%81%E6%B2%B8%E9%A8%B0%E6%B9%96%E6%B3%8A%E3%80%81%E5%86%92%E6%B3%A1%E6%B3%A5%E6%B1%A0%E3%80%81%E6%B0%B4%E6%9F%B1%E6%B2%96%E5%A4%A9%E9%96%93%E6%AD%87%E6%B3%89%E4%B8%80%E6%AC%A1%E7%9C%8B%E9%81%8D%E5%9C%B0%E7%86%B1%E5%90%8D%E6%99%AF%EF%BC%81-022145048.html', 'https://firebasestorage.googleapis.com/v0/b/javel-85c60.appspot.com/o/news%2Fnews1.png?alt=media&token=15790f41-513c-4187-86bd-23629dbd0da7'),
(3, '曼谷新地標「One Bangkok」月底開幕 ', '曼谷新地標「One Bangkok」將於10月25日開幕，這座結合商辦、酒店、購物、美食的複合式設施，開幕後將成為到曼谷旅遊玩樂新亮點。\r\n《ETtoday新聞雲》就整理出交通、設施與進駐酒店亮點，趁著現在台灣人到泰國玩免簽，趕快列入行程中。', 'https://travel.ettoday.net/article/2832804.htm', 'https://firebasestorage.googleapis.com/v0/b/javel-85c60.appspot.com/o/news%2Fnews2.png?alt=media&token=96df6db8-2e57-410a-b6e2-aa3a6fcc7ca1'),
(4, '東京池袋逛街懶人包', '池袋是東京重要的交通樞鈕之一，多條電車路線匯集，PARCO百貨、BIC CAMERA、唐吉訶德等商家，造就了池袋便利的購物環境。\r\n但也因為可以逛街的地點太多了，煩惱不知從何逛起的人也不少。\r\n別擔心！有了這篇就不用再怕迷路了！', 'https://udn.com/news/story/9651/8261770?from=udn-catelistnews_ch2', 'https://firebasestorage.googleapis.com/v0/b/javel-85c60.appspot.com/o/news%2Fnews3.png?alt=media&token=ad100738-bf53-4c23-ad03-c846433b80c1'),
(5, '朝聖《黑白大廚》白種元3餐廳', 'Netflix熱門實境秀《黑白大廚：料理階級大戰》近日已完結，討論熱度不斷。\r\n由於從評審到參賽主廚都擁有自己的餐廳，更掀起台灣旅客赴韓朝聖熱潮。\r\n有「國民廚神」之稱的白種元，就擁有多間餐飲品牌，以下整理3間到韓國必朝聖餐廳 !', 'https://travel.ettoday.net/article/2832383.html', 'https://firebasestorage.googleapis.com/v0/b/javel-85c60.appspot.com/o/news%2Fnews4.png?alt=media&token=ce298534-9dbe-45f6-a295-45b69cc1b4e9'),
(6, '大阪世界博覽會「17公尺鋼彈亮相」！', '2025年大阪世界博覽會將於明年4月13日正式揭幕，主題為「閃耀生命光輝的未來社會設計」，展示各領域的技術與創新理念。\r\n此次博覽會將在大阪的人工島「夢洲」舉行，場內特別建設了全球最大的環狀木造建築，讓參觀者感受未來社會的創意與科技結合，更狂的是還有17公尺鋼彈，粉絲一定可以大飽眼福！', 'https://udn.com/news/story/9652/8268683', 'https://firebasestorage.googleapis.com/v0/b/javel-85c60.appspot.com/o/news%2Fnews5.png?alt=media&token=7fc0c6ef-2413-4a71-b239-fa9cafaf57d1');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
