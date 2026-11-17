import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { logout } from '@/routes';

export default function VerifyEmail() {
    return (
        <>
            <Head title="Email verification" />

            <div className="text-center text-sm text-muted-foreground">
                Email verification is disabled.
            </div>

            <TextLink href={logout()} className="mx-auto mt-6 block text-sm">
                Log out
            </TextLink>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description: 'Email verification is currently disabled.',
};