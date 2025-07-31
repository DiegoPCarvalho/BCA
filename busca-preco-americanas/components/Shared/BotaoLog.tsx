import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoLog() {
    const router = useRouter();
   
    return (
        <TouchableOpacity
            onPress={() => router.push('/logs')}
        >
            <Ionicons name='list' size={40} color="white" />
        </TouchableOpacity>
    )
}