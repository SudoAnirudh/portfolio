"use client";

import React from 'react';
import SarcasticToast from "@/components/SarcasticToast";
import { useSarcasticObserver } from "@/hooks/useSarcasticObserver";

const SarcasticToastWrapper = () => {
    const { message, clearMessage } = useSarcasticObserver();

    return <SarcasticToast message={message} onClose={clearMessage} />;
};

export default SarcasticToastWrapper;
