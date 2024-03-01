import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PublicMenu } from '@/components/public-navbar';

export const metadata: Metadata = {
    title: "Privacy Policy | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }
  
    return (
        <main className="min-h-screen mx-auto p-4">
            <PublicMenu />
            <div className="max-w-4xl mt-8 mx-auto">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy for Gemini Sheets</h1>
            <p className="mb-4">
                The privacy and security of our users&apos; data is our top priority. This Privacy Policy outlines our practices concerning the handling of your data by the &apos;Gemini Sheets Add-on&apos;.
            </p>

            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-2">Data Collection and Use</h2>
                <p>
                    The &apos;Gemini Sheets&apos; add-on operates entirely within your Google Account&apos;s scope and does not store, share, or upload your data to any external systems. We collect and use data strictly necessary for the add-on&apos;s functionality, adhering to the principle of least privilege.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-2">Permissions Required</h2>
                <ul className="list-disc pl-5">
                    <li>View and manage your spreadsheets and documents within the application.</li>
                    <li>Connect to external services, specifically to request data from the Gemini AI API.</li>
                    <li>Display and run third-party web content within Google applications for an enhanced user experience.</li>
                </ul>
                <p className="mt-2">
                    These permissions are crucial for the add-on&apos;s operation, allowing it to read from and write to your documents and spreadsheets without creating or deleting any files from your drive.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-2">Data Security and Privacy</h2>
                <p>
                    Your data is transmitted to the Gemini AI API using secure, encrypted connections. We adhere to Google&apos;s API Services User Data Policy, including the Limited Use requirements, ensuring your data&apos;s security and privacy are upheld at all times.
                </p>
                <p className="mt-2">
                    We do not store any of your data on our servers. All user data remains within Google&apos;s infrastructure, subject to Google&apos;s robust security and privacy protocols.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-2">Revoking Permissions</h2>
                <p>
                    Should you wish to review or revoke the permissions granted to the add-on, you can do so by navigating to your Google Account settings, under &apos;Third-party apps with account access&apos;. Here, you can manage and remove access as needed.
                </p>
            </section>

            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                <p>
                    We reserve the right to update or change our Privacy Policy at any time. Any changes will be effectively immediately upon posting the updated document on our website. Your continued use of the add-on after any changes indicates your acceptance of the new Privacy Policy.
                </p>
            </section>

            <p className="mt-8">
                If you have any questions about this Privacy Policy, please contact us at xprilion@gmail.com.
            </p>
        </div>
    </main>
    );
  }
  