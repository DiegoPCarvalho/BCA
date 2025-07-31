import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoConfig() {
    const router = useRouter();
   
    return (
        <TouchableOpacity
            onPress={() => router.push('/config')}
        >
            <Ionicons name='settings' size={40} color="white" />
        </TouchableOpacity>
    )
}