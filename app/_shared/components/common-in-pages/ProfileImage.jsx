import Image from "next/image";

export default function ProfileImage({ name, profileImage, extraClassNames }) {
	const nameArray = name?.split(" ");

	let firstName = "";
	let lastName = "";

	if (nameArray?.length > 0) {
		firstName = nameArray[0];
	}

	if (nameArray?.length > 1) {
		lastName = nameArray[1];
	}

	const profileImageName = `${firstName.charAt(0)}${lastName.charAt(0)}`;
	if (profileImage) {
		return (
			<Image
				src={profileImage}
				alt={`${name} image`}
				fill
				sizes="100%"
				className="object-cover"
			/>
		);
	}
	return (
		<span
			aria-labelledby="first letter of first two words of a name if user image is not available"
			className={`block text-neutral-bright-100 ${extraClassNames}`}
		>
			{profileImageName}
		</span>
	);
}

// usage example:
{
	/* <div className="flex-none relative overflow-hidden h-16 sm:h-20 aspect-square rounded-full bg-primary/20 flex justify-center items-center">
	<ProfileImage
		name={profile?.fullName}
		profileImage={profile?.profilePicture}
		extraClassNames="!text-2xl sm:!text-3xl"
	/>
</div>; */
}
