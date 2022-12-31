import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PageHead = ({activePage, pageName}) =>{
	const navigate = useNavigate()
	const createUser = ()=>{
		navigate('/customer')
	}
	return(
		<div className="mb-sm-4 d-flex flex-wrap align-items-center text-head">
			<h2 className="mb-3 me-auto">{activePage}</h2>
			<button className="mb-3 me-auto" onClick={createUser}>Create Users</button>
			<div>
				<ol className="breadcrumb">
					<li className="breadcrumb-item active"><Link to={"#"}>{activePage}</Link></li>
					<li className="breadcrumb-item"><Link to={"#"}>{pageName}</Link></li>
				</ol>
			</div>
		</div>
	)
}
export default PageHead;