/*
  # Trigger para Auto-crear Perfil

  1. Función
    - Crear automáticamente un perfil cuando se registra un nuevo usuario
    - Copiar display_name desde user_metadata

  2. Trigger
    - Se ejecuta DESPUÉS de INSERT en auth.users
    - Crea entrada correspondiente en tabla profiles
*/

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();