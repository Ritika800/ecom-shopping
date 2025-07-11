import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface AvatarCustomization {
  bodyType: 'slim' | 'regular' | 'athletic';
  height: number;
  skinTone: string;
  hairColor: string;
}

interface CustomizationPanelProps {
  customization: AvatarCustomization;
  onCustomizationChange: (field: keyof AvatarCustomization, value: any) => void;
  selectedClothing?: any;
}

const SKIN_TONES = [
  { name: 'Fair', color: '#FDBCB4' },
  { name: 'Light', color: '#F1C27D' },
  { name: 'Medium', color: '#E0AC69' },
  { name: 'Tan', color: '#C68642' },
  { name: 'Brown', color: '#A67C5A' },
  { name: 'Dark', color: '#8D5524' }
];

const HAIR_COLORS = [
  { name: 'Brown', color: '#8B4513' },
  { name: 'Blonde', color: '#D2691E' },
  { name: 'Black', color: '#000000' },
  { name: 'Red', color: '#B22222' },
  { name: 'Auburn', color: '#A0522D' },
  { name: 'Gray', color: '#808080' }
];

export const CustomizationPanel = ({ 
  customization, 
  onCustomizationChange, 
  selectedClothing 
}: CustomizationPanelProps) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 space-y-4">
      {/* Product Info */}
      {selectedClothing && (
        <Card className="bg-primary text-primary-foreground p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">{selectedClothing.name}</h3>
              <p className="text-xs opacity-90 capitalize">
                {selectedClothing.type} {selectedClothing.size && `• Size ${selectedClothing.size}`}
              </p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {selectedClothing.color}
            </Badge>
          </div>
        </Card>
      )}

      {/* Customization Controls */}
      <Card className="bg-background/95 backdrop-blur-sm p-4 shadow-lg">
        <div className="space-y-4">
          {/* Body Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Body Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['slim', 'regular', 'athletic'].map((type) => (
                <Button
                  key={type}
                  variant={customization.bodyType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCustomizationChange('bodyType', type)}
                  className="capitalize text-xs"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Height: {(customization.height * 100).toFixed(0)}cm
            </label>
            <Slider
              value={[customization.height]}
              onValueChange={([value]) => onCustomizationChange('height', value)}
              min={1.5}
              max={2.0}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* Skin Tone */}
          <div>
            <label className="text-sm font-medium mb-2 block">Skin Tone</label>
            <div className="grid grid-cols-6 gap-2">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.color}
                  onClick={() => onCustomizationChange('skinTone', tone.color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    customization.skinTone === tone.color 
                      ? 'border-primary ring-2 ring-primary/50' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: tone.color }}
                  title={tone.name}
                />
              ))}
            </div>
          </div>

          {/* Hair Color */}
          <div>
            <label className="text-sm font-medium mb-2 block">Hair Color</label>
            <div className="grid grid-cols-6 gap-2">
              {HAIR_COLORS.map((hair) => (
                <button
                  key={hair.color}
                  onClick={() => onCustomizationChange('hairColor', hair.color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    customization.hairColor === hair.color 
                      ? 'border-primary ring-2 ring-primary/50' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: hair.color }}
                  title={hair.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};