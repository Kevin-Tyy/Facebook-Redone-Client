import React from "react";
import { Userdata } from "../../types/Types";
import ButtonComp from "../Buttons/Button";
interface Props {
    userId : string;
    userData : Userdata
}

const ProfileDetail = ({ userId , userData}: Props) => {
	return (
		<div>
			<div>
				<h1 className="text-light text-2xl">Bio</h1>
				<p className="text-light">
					{userData?.bio ? userData?.bio : "No bio added"}
				</p>
				{userData?.userId == userId && <ButtonComp color="#0C88EF">Edit Bio</ButtonComp>}
			</div>
			<div>
				<h1 className="text-light text-2xl">Bio</h1>
				<p className="text-light">
					{userData?.bio ? userData?.bio : "No bio added"}
				</p>
				{userData?.userId == userId && <ButtonComp color="#0C88EF">Edit Bio</ButtonComp>}
			</div>
			<div>
				<h1 className="text-light text-2xl">Bio</h1>
				<p className="text-light">
					{userData?.bio ? userData?.bio : "No bio added"}
				</p>
				{userData?.userId == userId && <ButtonComp color="#0C88EF">Edit Bio</ButtonComp>}
			</div>
			<div>
				<h1 className="text-light text-2xl">Bio</h1>
				<p className="text-light">
					{userData?.bio ? userData?.bio : "No bio added"}
				</p>
				{userData?.userId == userId && <ButtonComp color="#0C88EF">Edit Bio</ButtonComp>}
			</div>
		</div>
	);
};

export default ProfileDetail;
