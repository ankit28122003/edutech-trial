const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitContactForm(payload) {
  await delay();
  // Basic guard so the mock never "succeeds" on empty submissions.
  if (!payload.name || !payload.email || !payload.message) {
    throw new Error('Please fill in all required fields.');
  }
  return { success: true, ticketId: `TCK-${Date.now()}` };

  // Future implementation:
  // const { data } = await api.post('/contact', payload);
  // return data;
}
