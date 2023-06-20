import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { stringToColor } from '../../../../packages/functions';
import { use } from 'passport';
import { useAppSelector } from '../../hooks';

type CustomAvatarProps = {
    username: string;
    avatarUrl: string | null;
    size?: number;
};

const getInitials = (name: string) => {
    const words = name.split(' ');
    const initials = words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
    return initials.toUpperCase();
};

export const CustomAvatar = ({ username, avatarUrl, size = 40 }: CustomAvatarProps) => {
    const { session } = useAppSelector((state) => state.user);
    const [initials, setInitials] = useState<string>('');

    useEffect(() => {
        setInitials(getInitials(username));
    }, [username]);

    return avatarUrl ? (
        <Avatar
            alt={`Avatar de ${username}`}
            src={avatarUrl}
            sx={{ width: size, height: size }}
        />
    ) : (
        <Avatar sx={{ bgcolor: session?.userColor, width: size, height: size }}>{initials}</Avatar>
    );
};
