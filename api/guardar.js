export default async function handler(req, res) {
    // Solo aceptar POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { nombre, numero_de_control, puntaje, total } = req.body;

    // Validación básica
    if (!nombre || !numero_de_control || puntaje === undefined || total === undefined) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/resultados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ nombre, numero_de_control, puntaje, total })
        });

        if (!response.ok) {
            const error = await response.text();
            return res.status(500).json({ error });
        }

        return res.status(200).json({ ok: true });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}