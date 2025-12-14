import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        tech: '',
        description: '',
        link: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setProjects(projectsData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProject) {
                // Update existing
                await updateDoc(doc(db, "projects", currentProject.id), formData);
            } else {
                // Add new
                await addDoc(collection(db, "projects"), formData);
            }
            fetchProjects();
            resetForm();
        } catch (error) {
            console.error("Error saving project: ", error);
        }
    };

    const handleEdit = (project) => {
        setCurrentProject(project);
        setFormData(project);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteDoc(doc(db, "projects", id));
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project: ", error);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentProject(null);
        setFormData({
            title: '',
            category: '',
            tech: '',
            description: '',
            link: ''
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Manage Projects</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                    >
                        <Plus size={18} /> Add New
                    </button>
                )}
            </div>

            {isEditing && (
                <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                            {currentProject ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <button onClick={resetForm} className="text-[var(--text-secondary)] hover:text-red-500">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="NLP">NLP</option>
                                    <option value="Computer Vision">Computer Vision</option>
                                    <option value="App Dev">App Dev</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                name="tech"
                                value={formData.tech}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                                placeholder="e.g. Python, TensorFlow, React"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none min-h-[100px]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Project Link</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] focus:border-[var(--accent)] outline-none"
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 rounded-lg border border-[var(--card-border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 flex items-center gap-2"
                            >
                                <Save size={18} /> Save Project
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] flex justify-between items-center group hover:border-[var(--accent)] transition-colors">
                        <div>
                            <h4 className="font-semibold text-[var(--text-primary)]">{project.title}</h4>
                            <p className="text-sm text-[var(--text-secondary)]">{project.category}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;
