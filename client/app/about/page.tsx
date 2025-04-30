import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
    title: 'About Us - Icarus Eye',
    description: 'Learn about our UAV operator training school.',
};

export default function AboutPage(): JSX.Element {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Про нас</h1>
            <p className="text-lg">
                Ми є провідною школою підготовки операторів БПЛА, з фокусом на сучасні технології та бойову ефективність.
            </p>
        </>
    );
}
