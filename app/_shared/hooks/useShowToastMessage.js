"use client";
import { notification } from "antd";

export default function useShowToastMessage() {
	const showToastMessage = (type, title, messageInfo) => {
		return notification[type]({
			message: <div className="font-epilogue text-base">{title}</div>,
			description: (
				<div className="font-epilogue text-sm">{messageInfo}</div>
			),
			placement: "top",
		});
	};

	return {
		showToastMessage,
	};
}
