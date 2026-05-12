import { rmSync } from 'fs';

// Delete wedding features directory
try {
  rmSync('src/features/wedding', { recursive: true, force: true });
  console.log('✓ Deleted src/features/wedding/');
} catch (e) {
  console.log('✗ Failed to delete wedding dir:', e.message);
}

// Delete BrandContext
try {
  rmSync('src/context/BrandContext.jsx', { force: true });
  console.log('✓ Deleted src/context/BrandContext.jsx');
} catch (e) {
  console.log('✗ Failed to delete BrandContext:', e.message);
}

// Delete context directory if empty
try {
  rmSync('src/context', { force: true });
  console.log('✓ Deleted src/context/');
} catch (e) {
  // Directory not empty or already gone, that's fine
}

console.log('\nDone! Now delete this cleanup.mjs file.');
