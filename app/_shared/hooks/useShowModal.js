"use client";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { hexToRgba } from "../lib/helper-data";
import { COLORS } from "../lib/theme-data";

export default function useShowModal(params) {
	const [modalWidth, setModalWidth] = useState(0);
	const [modalCloseIconEnable, setModalCloseIconEnable] = useState(false);
	const [modalContentPadding, setModalContentPadding] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBodyContent, setModalBodyContent] = useState(null);
	const [modalFooterContent, setModalFooterContent] = useState(null);
	const [onCancelCallback, setOnCancelCallback] = useState(() => () => {});

	const showModal = ({
		width = 500,
		closeIconEnable = true,
		contentPadding = "",
		title = "",
		bodyContent = null,
		footerContent = null,
		onCancel = () => {},
	}) => {
		setModalWidth(width);
		setModalCloseIconEnable(closeIconEnable);
		setModalContentPadding(contentPadding);
		setModalTitle(title);
		setModalBodyContent(bodyContent);
		setModalFooterContent(footerContent);
		setOnCancelCallback(() => onCancel);
		setTimeout(() => {
			setModalOpen(true);
		}, 300);
	};

	const handleCancel = () => {
		onCancelCallback();
		setModalOpen(false);
	};

	return {
		modalOpen,
		setModalOpen,
		showModal,
		ModalContent: (
			<Modal
				title={modalTitle}
				centered
				open={modalOpen}
				onCancel={handleCancel}
				footer={modalFooterContent}
				width={modalWidth}
				// zIndex={9999}
				closable={modalCloseIconEnable}
				closeIcon={
					<CloseOutlined
						style={{
							color: COLORS.primary,
						}}
					/>
				}
				style={{
					borderWidth: "1px",
					borderColor: "transparent",
					borderRadius: "0.9375rem", // 15px (original 12px)
					overflow: "hidden",
				}}
				styles={{
					mask: {
						// background:
						// 	"linear-gradient(180deg, #1A1A1A 0%, rgba(26, 26, 26, 0.00) 100%)",
						backgroundColor: hexToRgba(
							COLORS.neutral.dark[900],
							0.5,
						),
						backdropFilter: "blur(6px)",
					},
					content: {
						backgroundColor: COLORS.neutral.bright[100],
						color: COLORS.neutral.dark[800],
						...(modalContentPadding && {
							padding: modalContentPadding,
						}),
					},
					header: {
						backgroundColor: "transparent",
					},
					footer: {
						backgroundColor: "transparent",
					},
				}}
			>
				{modalBodyContent}
			</Modal>
		),
	};
}
