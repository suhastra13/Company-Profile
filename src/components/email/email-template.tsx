import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  company,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h2 style={{ color: '#0f172a' }}>Pesan Baru dari Website Wokil Tech</h2>
    <hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
    
    <p><strong>Pengirim:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>WhatsApp:</strong> {phone}</p>
    <p><strong>Perusahaan:</strong> {company || '-'}</p>
    
    <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
      <strong>Pesan:</strong>
      <p style={{ whiteSpace: 'pre-wrap', marginTop: '5px' }}>{message}</p>
    </div>

    <hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
    <p style={{ fontSize: '12px', color: '#64748b' }}>
      Email ini dikirim otomatis dari Formulir Kontak Wokil Tech.
    </p>
  </div>
);