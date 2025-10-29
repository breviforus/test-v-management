const db = require('../db/db');

exports.getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let query = db('vacation_requests')
      .select('vacation_requests.*', 'users.name as user_name')
      .leftJoin('users', 'vacation_requests.user_id', 'users.id');
    
    if (status) query = query.where('vacation_requests.status', status);
    
    const requests = await query.orderBy('vacation_requests.created_at', 'desc');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await db('vacation_requests')
      .where({ user_id: req.params.userId })
      .orderBy('created_at', 'desc');
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user requests' });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { user_id, start_date, end_date, reason } = req.body;
    
    if (!user_id || !start_date || !end_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }
    
    const [newRequest] = await db('vacation_requests')
      .insert({ user_id, start_date, end_date, reason: reason || null, status: 'Pending' })
      .returning('*');
    
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create request' });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const [updated] = await db('vacation_requests')
      .where({ id: req.params.id })
      .update({ status, comments: comments || null, updated_at: db.fn.now() })
      .returning('*');
    
    if (!updated) return res.status(404).json({ error: 'Request not found' });
    
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update request' });
  }
};