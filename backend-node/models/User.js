import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';


const userSchema = new mongoose.Schema({
  //AUTENTICACION
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  username:{
    type:String,
    required: true,
    unique: true,
    trim: true
  },
  email:{
    type:String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password:{
    type:String,
    required: true
  },
  //PERFIL PUBLICO
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Imagen por defecto
  },
  bio: {
    type: String,
    maxlength: 250,
    default: '¡Hola! Soy nuev@ en CrochetLab.'
  },
  // --- ROLES Y PERMISOS (RBAC) ---
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'], // Solo permitimos estos valores
    default: 'user' // Por defecto, nadie es admin
  },
  // --- AUDITORÍA Y ESTADO ---
  isVerified: {
    type: Boolean,
    default: false // Empieza falso hasta que confirme el email
  },
  verificationToken: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'banned', 'blocked'],
    default: 'active'
  },
  //AUDITORIA
  lastLogin: {
    type: Date,
    default: Date.now
  },
  passwordChangedAt: Date, // invalidar tokens viejos si se cambia la clave,
  //PERFIL 
  crochetProfile: {
    level: {
      type: String, 
      enum: ['novice', 'apprentice', 'expert', 'grandmaster'],
      default: 'novice'
    }
  },
  learningPoints: {
    type: Number, 
    default: 0
  },
  preferredSystem: { // Vital para la IA (US/UK/ES)
    type: String,
    enum: ['US', 'UK', 'ES'], 
    default: 'US'
  },
  masteredTechniques: [{ // Array de strings: ["anillo magico", "punto alto"]
    type: String,
    trim: true
  }],
  badges: [{ type: String }] // URLs de imágenes de medallas ganadas
},{ 
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});


//Middlewares de Mongoose
//Encriptacion de contraseña 
userSchema.pre('save', async function(){  //Funcion antes del guardado
  if(!this.isModified('password')) {return ;} // Si no se modifica se salta el proceso
  const salt = await bcrypt.genSalt(10); // Mezclara la contraseña 10 veces 
  this.password = await bcrypt.hash(this.password, salt);
  if (this.isNew){
    this.passwordChangedAt = Date.now() - 1000;  
  }
    
});

//Comparacion de contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('User', userSchema);
