import { PublicMenu } from '@/components/public-navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service| Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {

    return (
        <main className="min-h-screen mx-auto p-4">
            <PublicMenu />
            <div className="max-w-4xl mt-8 mx-auto">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="mb-2">
                    Last Updated: 1 March, 2024
                </p>
                <section className="my-8">
                    <h2 className="text-2xl font-semibold mb-2">Acknowledgment</h2>
                    <p>
                        These are the terms and conditions governing the use of the service and establishing the agreement between you and Anubhav Singh (hereby referred as the “Company”). The following terms and conditions delineate the rights and responsibilities of all users in relation to the utilization of the service.
                    </p>
                    <p className="mt-2">
                        Your ability to access and use the service is contingent upon your acceptance of and adherence to these terms and conditions. These stipulations are applicable to all individuals, visitors, users, and others who either access or use the service.
                    </p>
                    <p className="mt-2">
                        By accessing or using the service, you express your agreement to be bound by these terms and conditions. If you do not agree with any portion of these terms and conditions, your access to the service is prohibited.
                    </p>
                    <p className="mt-2">
                        You affirm that you are at least 18 years old. The company does not authorize individuals under the age of 18 to use the service.
                    </p>
                    <p className="mt-2">
                        Furthermore, your access to and utilization of the service is subject to your acceptance of and compliance with the privacy policy of the company. Our privacy policy delineates our protocols and processes concerning the collection, utilization, and disclosure of your personal information when you interact with the application or the website. It also informs you about your privacy rights and the legal protections afforded to you.
                    </p>
                    <p className="mt-2">
                        We urge you to carefully review our privacy policy before engaging with our service.
                    </p>
                </section>

                <section className="my-8">
                    <h2 className="text-2xl font-semibold mb-2">Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including but not limited to a breach of these Terms and Conditions. Upon termination, your right to use the Service will cease immediately.
                    </p>
                </section>

                <section className="my-8">
                    <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
                    <p>
                        Regardless of any damages you might incur, the total liability of the Company and any of its suppliers under any provision of these Terms, and your exclusive remedy for all of the foregoing, shall be limited to the amount actually paid by you through the Service.
                    </p>
                    <p className="mt-2">
                        To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever, including, but not limited to, damages for loss of profits, loss of data or other information, business interruption, personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms.
                    </p>
                    <p className="mt-2">
                        Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&quot;s liability will be limited to the greatest extent permitted by law.
                    </p>
                </section>

                <section className="my-8">
                    <h2 className="text-2xl font-semibold mb-2">Changes to These Terms</h2>
                    <p>
                        We may periodically update or amend any of the terms in this agreement. Changes will immediately become effective upon posting the revised Terms of Service and End-User License Agreement on our website. If you do not wish to accept the amended agreement, you must cancel your access to our products. Continued use of our software accessed through the website in your personal account constitutes your acceptance of the terms of the modified agreement.
                    </p>
                </section>

                <p className="mt-8">
                    In case of any queries or concerns regarding the Terms of Service, please contact us at xprilion@gmail.com.
                </p>
            </div>
        </main>
    );
  }
  