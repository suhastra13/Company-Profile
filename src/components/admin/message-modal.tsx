"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; // npx shadcn@latest add dialog
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building, Calendar, CheckCircle, Reply } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: any;
  onStatusChange: (id: string, status: string) => void;
}

export default function MessageModal({ isOpen, onClose, message, onStatusChange }: MessageModalProps) {
  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-bold">Detail Pesan</DialogTitle>
            <Badge 
              className={`
                ${message.status === 'UNREAD' ? 'bg-red-500/20 text-red-400' : ''}
                ${message.status === 'READ' ? 'bg-blue-500/20 text-blue-400' : ''}
                ${message.status === 'REPLIED' ? 'bg-green-500/20 text-green-400' : ''}
              `}
            >
              {message.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sender Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase">Pengirim</label>
              <p className="font-semibold text-lg">{message.name}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase">Tanggal</label>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                {new Date(message.createdAt).toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-lg">
             <div className="flex items-center gap-2 text-sm text-gray-300">
               <Mail className="w-4 h-4 text-primary" />
               <a href={`mailto:${message.email}`} className="hover:text-primary truncate">{message.email}</a>
             </div>
             {message.phone && (
               <div className="flex items-center gap-2 text-sm text-gray-300">
                 <Phone className="w-4 h-4 text-primary" />
                 <span>{message.phone}</span>
               </div>
             )}
             {message.company && (
               <div className="flex items-center gap-2 text-sm text-gray-300">
                 <Building className="w-4 h-4 text-primary" />
                 <span>{message.company}</span>
               </div>
             )}
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">Isi Pesan</label>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10 text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[150px]">
              {message.message}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            Tutup
          </Button>
          
          <div className="flex gap-2">
            {message.status === 'UNREAD' && (
              <Button 
                onClick={() => { onStatusChange(message.id, 'READ'); onClose(); }}
                variant="outline" 
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <CheckCircle className="w-4 h-4 mr-2" /> Tandai Dibaca
              </Button>
            )}
            {message.status !== 'REPLIED' && (
              <Button 
                onClick={() => { onStatusChange(message.id, 'REPLIED'); onClose(); }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Reply className="w-4 h-4 mr-2" /> Tandai Dibalas
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}