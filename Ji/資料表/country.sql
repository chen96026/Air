-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2024-10-11 02:25:43
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
-- 資料表結構 `country`
--

CREATE TABLE `country` (
  `id` int(10) UNSIGNED NOT NULL,
  `country` varchar(1000) DEFAULT NULL,
  `city` varchar(1000) DEFAULT NULL,
  `time_zone` int(11) DEFAULT NULL,
  `airport` varchar(1000) DEFAULT NULL,
  `airport_name` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `country`
--

INSERT INTO `country` (`id`, `country`, `city`, `time_zone`, `airport`, `airport_name`) VALUES
(1, '台灣', '台北', 0, 'TPE', '臺灣桃園國際機場'),
(2, '日本', '千歲市', 1, 'CTS', '新千歲機場'),
(3, '日本', '福岡縣', 1, 'FUK', '福岡國際機場'),
(4, '日本', '東京', 1, 'HND', '東京羽田國際機場'),
(5, '日本', '大阪', 1, 'KIX', '關西國際機場'),
(6, '日本', '石川縣', 1, 'KMQ', '小松機場'),
(7, '日本', '愛媛縣', 1, 'MYJ', '松山機場'),
(8, '日本', '東京', 1, 'NRT', '東京成田國際機場'),
(9, '日本', '沖繩縣', 1, 'OKA', '那霸國際機場'),
(10, '日本', '宮城縣', 1, 'SDJ', '仙台國際機場'),
(11, '韓國', '仁川', 1, 'ICN', '仁川國際機場'),
(12, '美國', '休士頓', -13, 'IAH', '喬治·布希洲際機場'),
(13, '美國', '紐約', -12, 'JFK', '紐約約翰·甘迺迪國際機場​'),
(14, '美國', '洛杉磯', -15, 'LAX', '洛杉磯國際機場'),
(15, '美國', '芝加哥', -13, 'ORD', '芝加哥歐海爾國際機場'),
(16, '美國', '西雅圖', -15, 'SEA', '西雅圖-塔科馬國際機場'),
(17, '美國', '舊金山', -15, 'SFO', '舊金山國際機場'),
(18, '加拿大', '溫哥華', -15, 'YVR', '溫哥華國際機場'),
(19, '加拿大', '多倫多', -12, 'YYZ', '多倫多皮爾遜國際機場'),
(20, '德國', '慕尼黑', -6, 'MUC', '慕尼黑機場'),
(21, '荷蘭', '阿姆斯特丹', -6, 'AMS', '阿姆斯特丹史基浦機場'),
(22, '法國', '巴黎', -6, 'CDG', '巴黎戴高樂機場'),
(23, '英國', '倫敦', -7, 'LHR', '希斯洛機場'),
(24, '土耳其', '伊斯坦堡', -5, 'IST', '伊斯坦堡機場'),
(25, '義大利', '米蘭', -6, 'MXP', '米蘭-馬爾彭薩機場'),
(26, '奧地利', '維也納', -6, 'VIE', '維也納國際機場'),
(27, '澳洲', '布里斯本', 2, 'BNE', '布里斯本機場'),
(28, '紐西蘭', '奧克蘭', 4, 'AKL', '奧克蘭機場'),
(29, '新加坡', '新加坡', 0, 'SIN', '新加坡樟宜機場'),
(30, '越南', '峴港', -1, 'DAD', '峴港國際機場'),
(31, '越南', '河內', -1, 'HAN', '內排國際機場'),
(32, '越南', '胡志明市', -1, 'SGN', '新山一國際機場'),
(33, '泰國', '曼谷', -1, 'BKK', '蘇凡納布米國際機場'),
(34, '泰國', '清邁', -1, 'CNX', '清邁國際機場'),
(35, '泰國', '普吉島', -1, 'HKT', '布吉國際機場'),
(36, '馬來西亞', '吉隆坡', 0, 'KUL', '吉隆坡國際機場'),
(37, '馬來西亞', '檳城', 0, 'PEN', '檳城國際機場'),
(38, '菲律賓', '宿霧', 0, 'CEB', '麥克坦-宿霧國際機場'),
(39, '菲律賓', '安吉利斯', 0, 'CRK', '安吉里市克拉克國際機場'),
(40, '菲律賓', '馬尼拉', 0, 'MNL', '尼諾伊·艾奎諾國際機場'),
(41, '印尼', '雅加達', -1, 'CGK', '蘇加諾-哈達國際機場'),
(42, '印尼', '峇里島', -1, 'DPS', '伍拉·賴國際機場'),
(43, '柬埔寨', '金邊', -1, 'PNH', '金邊國際機場'),
(44, '緬甸', '仰光', -2, 'RGN', '仰光國際機場'),
(45, '中國', '香港', 0, 'HKG', '香港國際機場'),
(46, '中國', '澳門', 0, 'MFM', '澳門國際機場'),
(47, '中國', '廈門', 0, 'XMN', '廈門高崎國際機場'),
(48, '中國', '廣州', 0, 'CAN', '廣州白雲國際機場'),
(49, '中國', '重慶', 0, 'CKG', '重慶江北國際機場'),
(50, '中國', '成都', 0, 'TFU', '成都天府國際機場'),
(51, '中國', '杭州', 0, 'HGH', '杭州蕭山國際機場'),
(52, '中國', '北京', 0, 'PEK', '北京首都國際機場'),
(53, '中國', '上海', 0, 'PVG', '上海浦東國際機場'),
(54, '中國', '深圳', 0, 'SZX', '深圳寶安國際機場'),
(55, '中國', '青島', 0, 'TAO', '青島膠東國際機場');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `country`
--
ALTER TABLE `country`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
