import React from 'react';
import { Clock, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableField } from './EditableField';

interface TimelineEventProps {
  time: string;
  title: string;
  description?: string;
  image?: string;
  imageCaption?: string;
  isLast?: boolean;
  isEditing?: boolean;
  onUpdate?: (field: 'time' | 'title' | 'description' | 'imageCaption' | 'image', value: string) => void;
  onDelete?: () => void;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  time, 
  title, 
  description, 
  image, 
  imageCaption,
  isLast = false,
  isEditing = false,
  onUpdate = () => {},
  onDelete
}) => {
  return (
    <div className="relative pl-8 md:pl-32 py-4 group">
      {/* Delete Button (Edit Mode) */}
      {isEditing && onDelete && (
        <button 
          onClick={onDelete}
          className="absolute right-0 top-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-20"
          title="Delete Event"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Time Label (Desktop) */}
      <div className="hidden md:flex flex-col items-end absolute left-0 top-4 w-24 pr-4 text-right">
        {isEditing ? (
           <div className="w-full">
             <EditableField 
               value={time} 
               isEditing={true} 
               onSave={(val) => onUpdate('time', val)}
               className="text-xs text-right"
               placeholder="Time"
             />
           </div>
        ) : (
          <>
            <span className="font-bold text-blue-600 text-lg">{time.split('-')[0]}</span>
            <span className="text-slate-400 text-xs">{time}</span>
          </>
        )}
      </div>

      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[111px] top-8 bottom-0 w-0.5 bg-slate-200 group-hover:bg-blue-200 transition-colors"></div>
      )}

      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-[100px] top-5 w-6 h-6 rounded-full bg-white border-4 border-blue-500 z-10 shadow-sm group-hover:scale-110 transition-transform"></div>

      {/* Content Card */}
      <div className="bg-slate-50 hover:bg-white rounded-lg p-4 border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all">
        {/* Time Label (Mobile) */}
        <div className="md:hidden flex items-center gap-2 mb-2 text-blue-600 font-semibold">
          <Clock size={14} />
          <EditableField 
            value={time} 
            isEditing={isEditing} 
            onSave={(val) => onUpdate('time', val)} 
            placeholder="Time..."
          />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">
          <EditableField 
            value={title} 
            isEditing={isEditing} 
            onSave={(val) => onUpdate('title', val)} 
            placeholder="Event Title..."
          />
        </h3>
        
        {/* Description - Always show in edit mode */}
        {(description || isEditing) && (
          <div className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
            <EditableField 
              value={description} 
              isEditing={isEditing} 
              onSave={(val) => onUpdate('description', val)} 
              multiline={true}
              placeholder="Add description..."
            />
          </div>
        )}

        {/* Image - Show URL input in edit mode */}
        {isEditing && (
           <div className="mb-2 p-2 bg-slate-100 rounded border border-slate-200">
             <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
               <ImageIcon size={12} /> Image URL (Optional)
             </div>
             <EditableField 
               value={image} 
               isEditing={isEditing} 
               onSave={(val) => onUpdate('image', val)} 
               placeholder="https://example.com/image.jpg"
             />
           </div>
        )}

        {image && !isEditing && (
          <div className="mt-4 mb-2">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={image} 
                alt={imageCaption || title} 
                className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {imageCaption && (
              <div className="mt-2 text-center text-xs text-slate-400 italic">
                 {imageCaption}
              </div>
            )}
          </div>
        )}
        
        {/* Image Caption Edit */}
        {isEditing && image && (
          <div className="mt-2 text-center text-xs text-slate-400 italic">
            <EditableField 
              value={imageCaption} 
              isEditing={isEditing} 
              onSave={(val) => onUpdate('imageCaption', val)} 
              placeholder="Image caption..."
            />
          </div>
        )}
      </div>
    </div>
  );
};