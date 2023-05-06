export interface PaginateResult<T> {
	docs: Array<T>;
	total: any;
	limit: any;
	page?: any;
	pages?: any;
}
