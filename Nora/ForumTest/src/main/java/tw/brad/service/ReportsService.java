package tw.brad.service;

import tw.brad.model.Reports;

public interface ReportsService {
	public Reports addReport (Long userId, Long postId);
}
