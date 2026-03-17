import { PageHeader } from "@/components/page-header";
import ContactForm from "./contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact Us"
                description="We'd love to hear from you. Send us a message and we'll get back to you shortly."
            />
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <ContactForm />
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 mt-1 text-primary" />
                                    <div>
                                        <p className="font-medium text-foreground">Email</p>
                                        <a href="mailto:hello@agroqora.com" className="hover:underline">hello@agroqora.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 mt-1 text-primary" />
                                    <div>
                                        <p className="font-medium text-foreground">Phone</p>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-1 text-primary" />
                                    <div>
                                        <p className="font-medium text-foreground">Office</p>
                                        <p>123 Agri-Tech Ave, Farmville, CA 90210</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
