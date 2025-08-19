import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

function Profile() {
	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const name = "name placeholder";
	const location = "location placeholder";

	return (
		<div className="container vh-100 d-flex justify-content-center align-items-center">
			<div className="card p-4" style={{ width: "600px" }}>
				<div className="d-flex align-items-center">
					<img
						src="https://placehold.co/128x128"
						alt="Profile"
						className="rounded-circle mb-3"
						style={{ width: "150px", height: "150px" }}
					/>
					<div className="ms-4">
						<h2>{name}</h2>
						<p>located in {location}</p>
					</div>
				</div>
				<hr />
				<Nav tabs>
					<NavItem>
						<NavLink
							className={activeTab === "1" ? "active" : ""}
							onClick={() => toggle("1")}
						>
							Favorites
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={activeTab === "2" ? "active" : ""}
							onClick={() => toggle("2")}
						>
							Transactions
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={activeTab === "3" ? "active" : ""}
							onClick={() => toggle("3")}
						>
							Comments
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<div className="p-4">
							<h4>Favorites</h4>
							<p>Your favorite items will be displayed here.</p>
						</div>
					</TabPane>
					<TabPane tabId="2">
						<div className="p-4">
							<h4>Transactions</h4>
							<p>
								Your transaction history will be displayed here.
							</p>
						</div>
					</TabPane>
					<TabPane tabId="3">
						<div className="p-4">
							<h4>Comments</h4>
							<p>Your comments will be displayed here.</p>
						</div>
					</TabPane>
				</TabContent>
			</div>
		</div>
	);
}

export default Profile;
