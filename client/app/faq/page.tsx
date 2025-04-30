import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
    title: 'FAQ - Icarus Eye',
    description: 'Learn about our UAV operator training school.',
};

export default function FAQPage(): JSX.Element {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">FAQ</h1>
            <p className="text-lg">
                Ми є провідною школою підготовки операторів БПЛА, з фокусом на сучасні технології та бойову ефективність.
            </p>
        </>
    );
}
