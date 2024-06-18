"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi';

const ProfilePage = () => {
    const { isConnected } = useAccount();
    const { push } = useRouter();


  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <div>
      Profile
    </div>
  )
}

export default ProfilePage
