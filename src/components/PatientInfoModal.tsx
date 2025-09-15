import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientInfo {
  name: string;
  age: string;
  sex: string;
  contactNumber: string;
  dateOfBirth: string;
}

interface PatientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientInfo: PatientInfo) => void;
}

export default function PatientInfoModal({ isOpen, onClose, onSubmit }: PatientInfoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    contactNumber: "",
    dateOfBirth: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData as PatientInfo);
      // Reset form
      setFormData({
        name: "",
        age: "",
        sex: "",
        contactNumber: "",
        dateOfBirth: ""
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">Patient Information</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter patient's full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="Age"
                  type="number"
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">Sex *</Label>
                <select
                  id="sex"
                  value={formData.sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md text-sm ${errors.sex ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="Phone number"
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                placeholder="DD/MM/YYYY"
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Continue to Print
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
