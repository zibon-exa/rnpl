'use client';

import { useState } from 'react';
import { Comment } from '@/types/file';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { Send, MessageSquare } from 'lucide-react';
import { User } from '@/types/user';

interface CommentSectionProps {
    comments: Comment[];
    user: User;
    onAddComment: (text: string) => void;
}

export function CommentSection({ comments, user, onAddComment }: CommentSectionProps) {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment('');
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Comment Count Header */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-slate-500" />
                    <span className="text-sm font-semibold text-slate-700 font-inter">
                        {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Input Area - Now at the Top */}
            <div className="p-4 border-b border-slate-100 bg-white">
                <div className="flex gap-3 items-start">
                    <Avatar className="h-8 w-8 shrink-0 ring-1 ring-slate-100 mt-1">
                        <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                        <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-[10px] font-bold">
                            {getInitials(user.nameEn)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 focus-within:bg-white transition-all">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add an official comment..."
                            className="flex-1 pl-2.5 py-1.5 bg-transparent border-none outline-none text-sm resize-none min-h-[36px] max-h-[120px] font-inter overflow-y-auto"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                        />
                        <Button
                            size="icon"
                            className="h-8 w-8 shrink-0 bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white rounded-lg transition-all active:scale-90 disabled:opacity-50 mb-0.5"
                            onClick={handleSubmit}
                            disabled={!newComment.trim()}
                        >
                            <Send size={14} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Comment List - Reverse Chronological */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {comments.length > 0 ? (
                    [...comments].reverse().map((comment) => (
                        <div key={comment.id} className="flex gap-3 items-start group">
                            <Avatar className="h-8 w-8 shrink-0 ring-1 ring-slate-100">
                                <AvatarImage src={getAvatarPath(comment.author, comment.avatarId)} alt={comment.author} />
                                <AvatarFallback className="bg-slate-200 text-slate-700 text-[10px] font-bold">
                                    {getInitials(comment.author)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-bold text-slate-900 truncate font-inter">
                                        {comment.author}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium shrink-0 font-inter">
                                        {new Date(comment.timestamp).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <div className="bg-slate-50 rounded-lg rounded-tl-none p-3 border border-slate-100">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <MessageSquare size={32} className="text-slate-200" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium font-inter">No comments yet</p>
                        <p className="text-slate-400 text-xs mt-1 font-inter">Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
